"use server";

import { getServiceById } from "@/models/service";
import { bookingSchema } from "@/validations/booking.schema";
import {
  cancelBooking as cancelBookingModel,
  completeBookingRefund,
  createBooking as insertBooking,
  getBookingByIdForUser,
  markBookingRefundPending,
  recoverBookingPaymentIntent,
} from "@/models/booking";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { refundStripePayment, verifyCheckoutPayment } from "@/lib/stripe";

export async function createBooking(
  serviceId: string,
  data: unknown
) {
  if (!ObjectId.isValid(serviceId)) {
    return {
      success: false,
      message: "Invalid service.",
    };
  }

  const session = await auth();
  if (!session?.user?.email) {
    return {
      success: false,
      message: "You must be logged in to create a booking.",
    };
  }

  const result = bookingSchema.safeParse(data);

  if (!result.success) {
    return {
      success: false,
      message: "please check your booking information.",
      errors: result.error.flatten().fieldErrors,
    };
  }

  const service = await getServiceById(serviceId);

  if (!service) {
    return {
      success: false,
      message: "Service not found.",
    };
  }

  const { durationType, durationValue } = result.data;

  const rate =
    durationType === "day"
      ? service.dailyRate
      : service.hourlyRate;

  const totalCost = durationValue * rate;

  try {
    const bookingId = await insertBooking({
      userId: session.user.email,
      serviceId: service._id!,
      serviceName: service.name,
      duration: {
        type: durationType,
        value: durationValue,
      },
      location: {
        division: result.data.division,
        district: result.data.district,
        city: result.data.city,
        area: result.data.area,
        address: result.data.address,
      },
      phone: result.data.phone,
      totalCost,
      status: "pending",
      paymentStatus: "unpaid",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return {
      success: true,
      message: "Booking created successfully.",
      bookingId,
    };
  } catch (error) {
    console.error("Failed to create booking:", error);

    return {
      success: false,
      message: "Something went wrong while creating your booking. Please try again.",
    };
  }


}


export async function cancelBooking(bookingId: string) {
  const session = await auth();

  if (!session?.user?.email) {
    return {
      success: false,
      message: "You must be logged in.",
    };
  }

  const userId = session.user.email;

  const booking = await getBookingByIdForUser(bookingId, userId);

  if (!booking) {
    return {
      success: false,
      message: "Booking not found or you are not authorized to cancel it.",
    };
  }

  if (!["pending", "confirmed"].includes(booking.status)) {
    return {
      success: false,
      message: "This booking cannot be cancelled.",
    };
  }

  try {
    if (booking.paymentStatus === "paid") {
      if (!booking.stripePaymentIntentId) {
        return {
          success: false,
          message:
            "We couldn't find the payment reference. Please contact support.",
        };
      }

      // Reserve the refund before calling Stripe.
      const reserved = await markBookingRefundPending(bookingId, userId);

      if (!reserved) {
        return {
          success: false,
          message:
            "This booking is already being updated. Refresh the page and try again.",
        };
      }

      // Stripe's idempotency key helps prevent duplicate refunds.
      const refund = await refundStripePayment(
        booking.stripePaymentIntentId,
        bookingId
      );

      if (refund.status !== "succeeded") {
        console.warn(
          `Refund for booking ${bookingId} has status: ${refund.status}`
        );

        return {
          success: false,
          message:
            refund.status === "pending"
              ? "Your refund is pending with Stripe. Please check again later."
              : "The refund has not completed successfully. Please contact support before retrying.",
        };
      }

      // Mark the booking cancelled only after Stripe accepts the refund.
      const completed = await completeBookingRefund(bookingId, userId);

      if (!completed) {
        console.error(
          `Refund accepted by Stripe, but booking ${bookingId} could not be finalized.`
        );

        return {
          success: false,
          message:
            "Your refund was accepted, but the booking status could not be updated. Please contact support.",
        };
      }

      return {
        success: true,
        message: "Booking cancelled and refund initiated successfully.",
      };
    }

    if (
      booking.paymentStatus !== "unpaid" ||
      booking.status !== "pending"
    ) {
      return {
        success: false,
        message: "This booking cannot be cancelled in its current state.",
      };
    }

    const cancelled = await cancelBookingModel(bookingId, userId, false);

    if (!cancelled) {
      return {
        success: false,
        message: "The booking could not be cancelled. Please refresh and try again.",
      };
    }

    return {
      success: true,
      message: "Booking cancelled successfully.",
    };
  } catch (error) {
    console.error("Failed to cancel booking or process refund:", error);

    return {
      success: false,
      message:
        "Something went wrong while cancelling your booking. If a refund was initiated, please check its status before retrying or contact support.",
    };
  }
}

export async function recoverExistingBookingPayment(
  bookingId: string,
  sessionId: string,
  paymentIntentId: string
) {
  const session = await auth();

  if (!session?.user?.email) {
    return { success: false, message: "You must be logged in." };
  }

  const booking = await getBookingByIdForUser(
    bookingId,
    session.user.email
  );

  if (!booking) {
    return { success: false, message: "Booking not found." };
  }

  if (
    booking.status !== "confirmed" ||
    booking.paymentStatus !== "paid" ||
    booking.stripePaymentIntentId
  ) {
    return {
      success: false,
      message: "The booking is not eligible for payment recovery.",
    };
  }

  const verified = await verifyCheckoutPayment({
    sessionId,
    bookingId,
    paymentIntentId,
    totalCost: booking.totalCost,
  });

  if (!verified) {
    return {
      success: false,
      message: "Stripe payment verification failed.",
    };
  }

  const recovered = await recoverBookingPaymentIntent(
    bookingId,
    paymentIntentId,
    booking.totalCost
  );

  if (!recovered) {
    return {
      success: false,
      message: "The payment reference was not updated. Refresh and check the booking.",
    };
  }

  return {
    success: true,
    message: "Payment reference recovered successfully.",
  };
}
