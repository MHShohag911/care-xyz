import { stripe } from "@/lib/stripe";
import {
    getBookingById,
    markBookingAsPaid,
    reconcileBookingRefund,
    reconcileBookingRefundById,
} from "@/models/booking";
import { getUserByEmail } from "@/models/user";
import { sendPaymentConfirmationEmail } from "@/lib/email/payment-confirmation";

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

        const paymentIntentId =
            typeof checkoutSession.payment_intent === "string"
                ? checkoutSession.payment_intent
                : checkoutSession.payment_intent?.id;

        if (!paymentIntentId) {
            console.error(
                `Missing Payment Intent ID for booking ${bookingId}.`
            );

            return new Response("Missing Payment Intent ID.", {
                status: 400,
            });
        }

        const updated = await markBookingAsPaid(bookingId, paymentIntentId);

        if (updated) {
            console.log(`Booking ${bookingId} marked as paid.`);
            const user = await getUserByEmail(booking.userId);

            if (!user) {
                console.error(
                    `User ${booking.userId} not found for booking ${bookingId}.`
                );
            }

            if (user) {
                await sendPaymentConfirmationEmail({
                    bookingId: booking._id!,
                    customerName: user.name,
                    customerEmail: user.email,
                    serviceName: booking.serviceName,
                    duration: booking.duration,
                    phone: booking.phone,
                    location: booking.location,
                    totalCost: booking.totalCost,
                    paymentMethod: "Card",
                    paymentStatus: "Paid",
                    paidAt: new Date(),
                });
            }
        }

        if (!updated) {
            console.error(
                `Could not mark booking ${bookingId} as paid.`
            );
        }

    }


    if (event.type === "charge.refunded") {
        const charge = event.data.object;

        const paymentIntentId =
            typeof charge.payment_intent === "string"
                ? charge.payment_intent
                : charge.payment_intent?.id;

        if (charge.refunded && paymentIntentId) {
            try {
                const reconciled =
                    await reconcileBookingRefund(paymentIntentId);

                if (reconciled) {
                    console.log(
                        `Booking refund reconciled for PaymentIntent ${paymentIntentId}.`
                    );
                } else {
                    console.log(
                        `No pending booking refund found for PaymentIntent ${paymentIntentId}.`
                    );
                }
            } catch (error) {
                console.error("Failed to reconcile booking refund:", error);

                return new Response("Refund reconciliation failed.", {
                    status: 500,
                });
            }
        }
    }

    if (event.type === "refund.updated") {
        const refund = event.data.object;

        if (refund.status === "succeeded" && refund.payment_intent) {
            const paymentIntentId =
                typeof refund.payment_intent === "string"
                    ? refund.payment_intent
                    : refund.payment_intent.id;

            try {
                const reconciled =
                    await reconcileBookingRefundById(paymentIntentId, refund.amount);

                if (reconciled) {
                    console.log(
                        `Booking refund reconciled for PaymentIntent ${paymentIntentId}.`
                    );
                } else {
                    console.log(
                        `No pending booking refund found for PaymentIntent ${paymentIntentId}.`
                    );
                }
            } catch (error) {
                console.error(
                    "Failed to reconcile updated refund:",
                    error
                );

                return new Response("Refund reconciliation failed.", {
                    status: 500,
                });
            }
        }
    }


    return new Response("Webhook received.", {
        status: 200,
    });
}




