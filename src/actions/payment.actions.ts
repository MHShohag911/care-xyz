"use server";

import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { getBookingById } from "@/models/booking";

export async function createCheckoutSession(bookingId: string) {
    const session = await auth();

    if (!session?.user?.email) {
        return {
            success: false,
            message: "You must be logged in.",
        };
    }

    const booking = await getBookingById(bookingId);

    if (!booking) {
        return {
            success: false,
            message: "Booking not found.",
        };
    }

    if (booking.userId !== session.user.email) {
        return {
            success: false,
            message: "You are not authorized to pay for this booking."
        };

    }

    if (booking.status !== "pending") {
        return {
            success: false,
            message: "This booking is not available for payment."
        };
    }

    if (booking.paymentStatus !== "unpaid") {
        return {
            success: false,
            message: "this booking has already paid.",
        };
    }

    const checkoutSession = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
            {
                price_data: {
                    currency: "bdt",
                    product_data: {
                        name: booking.serviceName,
                    },
                    unit_amount: booking.totalCost * 100,
                },
                quantity: 1,
            },
        ],
        metadata: {
            bookingId: booking._id!,
        },
        success_url: `${process.env.APP_URL}/my-bookings/${booking._id}?payment=success`,
        cancel_url: `${process.env.APP_URL}/my-bookings/${booking._id}?payment=cancelled`,
    });

    return {
        success: true,
        url: checkoutSession.url,
    };
}