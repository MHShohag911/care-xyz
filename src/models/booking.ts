import { getDatabase } from "@/lib/mongodb";
import { Booking } from "@/types/booking";
import { ObjectId } from "mongodb";

type BookingDocument = Omit<Booking, "_id"> & {
    _id: ObjectId;
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
    }
}

export async function getBookingsByUserId(userId: string): Promise<Booking[]> {
    const db = await getDatabase();

    const bookings = await db.collection<BookingDocument>(COLLECTION_NAME).find({ userId }).sort({ createdAt: -1 }).toArray();

    return bookings.map((booking) => ({
        ...booking,
        _id: booking._id.toString(),
    }));
}

export async function cancelBooking(
  bookingId: string,
  userId: string
): Promise<boolean> {
  if (!ObjectId.isValid(bookingId)) {
    return false;
  }

  const db = await getDatabase();

  const result = await db.collection<BookingDocument>(COLLECTION_NAME).updateOne(
    {
      _id: new ObjectId(bookingId),
      userId,
    },
    {
      $set: {
        status: "cancelled",
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount === 1;
}