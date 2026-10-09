import { getDatabase } from "@/lib/mongodb";
import { Booking } from "@/types/booking";
import { ObjectId } from "mongodb";

type BookingDocument = Omit<Booking, "_id"> & {
  _id: ObjectId;
  paymentStatus?: Booking["paymentStatus"];
}

const COLLECTION_NAME = "bookings";

export async function createBooking(
  booking: Omit<Booking, "_id">
): Promise<string> {
  const db = await getDatabase();

  const result = await db.collection<BookingDocument>(COLLECTION_NAME).insertOne({
    ...booking,
    _id: new ObjectId(),
  });

  return result.insertedId.toString();
}

export async function markBookingAsPaid(
  bookingId: string,
  stripePaymentIntentId: string
): Promise<boolean> {
  if (!ObjectId.isValid(bookingId)) {
    return false;
  }

  const db = await getDatabase();

  const result = await db
    .collection<BookingDocument>(COLLECTION_NAME)
    .updateOne(
      {
        _id: new ObjectId(bookingId),
        paymentStatus: "unpaid",
        status: "pending",
      },
      {
        $set: {
          paymentStatus: "paid",
          status: "confirmed",
          stripePaymentIntentId,
          updatedAt: new Date(),
        },
      }
    );

  return result.modifiedCount === 1;
}

export async function recoverBookingPaymentIntent(
  bookingId: string,
  stripePaymentIntentId: string,
  expectedTotalCost: number
): Promise<boolean> {
  if (!ObjectId.isValid(bookingId)) {
    return false;
  }

  const db = await getDatabase();

  const result = await db
    .collection<BookingDocument>(COLLECTION_NAME)
    .updateOne(
      {
        _id: new ObjectId(bookingId),
        status: "confirmed",
        paymentStatus: "paid",
        totalCost: expectedTotalCost,
        stripePaymentIntentId: { $exists: false },
      },
      {
        $set: {
          stripePaymentIntentId,
          updatedAt: new Date(),
        },
      }
    );

  return result.modifiedCount === 1;
}

export async function getBookingById(
  bookingId: string
): Promise<Booking | null> {
  if (!ObjectId.isValid(bookingId)) {
    return null;
  }

  const db = await getDatabase();

  const booking = await db.collection<BookingDocument>(COLLECTION_NAME).findOne({ _id: new ObjectId(bookingId) });

  if (!booking) {
    return null;
  }

  return {
    ...booking,
    _id: booking._id.toString(),
    paymentStatus: booking.paymentStatus ?? "unpaid",

  }
}

export async function getBookingsByUserId(userId: string): Promise<Booking[]> {
  const db = await getDatabase();

  const bookings = await db.collection<BookingDocument>(COLLECTION_NAME).find({ userId }).sort({ createdAt: -1 }).toArray();

  return bookings.map((booking) => ({
    ...booking,
    _id: booking._id.toString(),
    paymentStatus: booking.paymentStatus ?? "unpaid",
  }));
}


export async function getBookingByIdForUser(
  bookingId: string,
  userId: string
): Promise<Booking | null> {
  if (!ObjectId.isValid(bookingId)) {
    return null;
  }

  const db = await getDatabase();

  const booking = await db
    .collection<BookingDocument>(COLLECTION_NAME)
    .findOne({
      _id: new ObjectId(bookingId),
      userId,
    });

  if (!booking) {
    return null;
  }

  return {
    ...booking,
    _id: booking._id.toString(),
    paymentStatus: booking.paymentStatus ?? "unpaid",
  };
}



export async function cancelBooking(
  bookingId: string,
  userId: string,
  wasPaid: boolean
): Promise<boolean> {
  if (!ObjectId.isValid(bookingId)) {
    return false;
  }

  const db = await getDatabase();

  const result = await db
    .collection<BookingDocument>(COLLECTION_NAME)
    .updateOne(
      {
        _id: new ObjectId(bookingId),
        userId,
        status: { $in: ["pending", "confirmed"] },
        paymentStatus: wasPaid ? "paid" : "unpaid",
      },
      {
        $set: {
          status: "cancelled",
          ...(wasPaid && { paymentStatus: "refunded" as const }),
          updatedAt: new Date(),
        },
      }
    );

  return result.modifiedCount === 1;
}


export async function markBookingRefundPending(
  bookingId: string,
  userId: string
): Promise<boolean> {
  if (!ObjectId.isValid(bookingId)) {
    return false;
  }

  const db = await getDatabase();

  const result = await db
    .collection<BookingDocument>(COLLECTION_NAME)
    .updateOne(
      {
        _id: new ObjectId(bookingId),
        userId,
        status: "confirmed",
        paymentStatus: "paid",
      },
      {
        $set: {
          paymentStatus: "refund_pending",
          updatedAt: new Date(),
        },
      }
    );

  return result.modifiedCount === 1;
}


export async function completeBookingRefund(
  bookingId: string,
  userId: string
): Promise<boolean> {
  if (!ObjectId.isValid(bookingId)) {
    return false;
  }

  const db = await getDatabase();

  const result = await db
    .collection<BookingDocument>(COLLECTION_NAME)
    .updateOne(
      {
        _id: new ObjectId(bookingId),
        userId,
        status: "confirmed",
        paymentStatus: "refund_pending",
      },
      {
        $set: {
          status: "cancelled",
          paymentStatus: "refunded",
          updatedAt: new Date(),
        },
      }
    );

  return result.modifiedCount === 1;
}


export async function reconcileBookingRefund(
  paymentIntentId: string
): Promise<boolean> {
  const db = await getDatabase();

  const result = await db
    .collection<BookingDocument>(COLLECTION_NAME)
    .updateOne(
      {
        stripePaymentIntentId: paymentIntentId,
        status: "confirmed",
        paymentStatus: "refund_pending",
      },
      {
        $set: {
          status: "cancelled",
          paymentStatus: "refunded",
          updatedAt: new Date(),
        },
      }
    );

  return result.modifiedCount === 1;
}

export async function reconcileBookingRefundById(
    paymentIntentId: string,
    refundedAmount: number
): Promise<boolean> {
    const db = await getDatabase();
    const bookings = db.collection<BookingDocument>(COLLECTION_NAME);

    const booking = await bookings.findOne({
        stripePaymentIntentId: paymentIntentId,
        status: "confirmed",
        paymentStatus: "refund_pending",
    });

    if (!booking || refundedAmount !== booking.totalCost * 100) {
        return false;
    }

    const result = await bookings.updateOne(
        {
            _id: booking._id,
            status: "confirmed",
            paymentStatus: "refund_pending",
        },
        {
            $set: {
                status: "cancelled",
                paymentStatus: "refunded",
                updatedAt: new Date(),
            },
        }
    );

    return result.modifiedCount === 1;
}

