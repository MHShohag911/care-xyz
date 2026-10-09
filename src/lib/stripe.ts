import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("STRIPE_SECRET_KEY is not configured.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function refundStripePayment(
    paymentIntentId: string,
    bookingId: string
) {
    return stripe.refunds.create(
        {
            payment_intent: paymentIntentId,
        },
        {
            idempotencyKey: `care-xyz-refund-${bookingId}`,
        }
    );
}

export async function verifyCheckoutPayment({
    sessionId,
    bookingId,
    paymentIntentId,
    totalCost,
}: {
    sessionId: string;
    bookingId: string;
    paymentIntentId: string;
    totalCost: number;
}): Promise<boolean> {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    const sessionPaymentIntent =
        typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;

    let successUrl: URL;

    try {
        if (!session.success_url) return false;
        successUrl = new URL(session.success_url);
    } catch {
        return false;
    }

    return (
        session.mode === "payment" &&
        session.payment_status === "paid" &&
        session.currency === "bdt" &&
        session.amount_total === totalCost * 100 &&
        sessionPaymentIntent === paymentIntentId &&
        successUrl.pathname === `/my-bookings/${bookingId}` &&
        successUrl.searchParams.get("payment") === "success"
    );
}
