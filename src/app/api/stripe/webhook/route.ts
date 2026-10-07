import { stripe } from "@/lib/stripe";
import {
    getBookingById,
    markBookingAsPaid,
} from "@/models/booking";

export async function POST(request: Request) {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
        return new Response("Missing Stripe signature.", {
            status: 400,
        });
    }

    if (!process.env.STRIPE_WEBHOOK_SECRET) {
        return new Response("Stripe webhook secret is not configured.", {
            status: 500,
        });
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (error) {
        console.error("Stripe webhook signature verification failed:", error);

        return new Response("Invalid Stripe signature.", {
            status: 400,
        });
    }

    if (event.type === "checkout.session.completed") {
        const checkoutSession = event.data.object;

        const bookingId = checkoutSession.metadata?.bookingId;

        if (!bookingId) {
            console.error("Missing bookingId in Stripe Checkout metadata.");

            return new Response("Missing booking ID.", {
                status: 400,
            });
        }

        const booking = await getBookingById(bookingId);

        if (!booking) {
            console.error(`Booking ${bookingId} not found.`);

            return new Response("Booking not found.", {
                status: 404,
            });
        }

        if (checkoutSession.amount_total !== booking.totalCost * 100) {
            console.error(
                `Payment amount mismatch for booking ${bookingId}.`
            );

            return new Response("Payment amount mismatch.", {
                status: 400,
            });
        }

        if (checkoutSession.currency !== "bdt") {
            console.error(
                `Payment currency mismatch for booking ${bookingId}.`
            );

            return new Response("Payment currency mismatch.", {
                status: 400,
            });
        }

        if (checkoutSession.payment_status !== "paid") {
            return new Response("Payment has not been completed.", {
                status: 400,
            });
        }

        const updated = await markBookingAsPaid(bookingId);

        if (!updated) {
            console.error(
                `Could not mark booking ${bookingId} as paid.`
            );
        }
    }

    return new Response("Webhook received.", {
        status: 200,
    });
}