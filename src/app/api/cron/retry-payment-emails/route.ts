
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { getUserByEmail } from "@/models/user";
import {
    claimPaymentEmailAttempt,
    getBookingById,
    updatePaymentEmailStatus,
} from "@/models/booking";
import { sendPaymentConfirmationEmail } from "@/lib/email/payment-confirmation";

const MAX_ATTEMPTS = 3;
const BATCH_SIZE = 10;

export async function GET(request: Request) {
    const authHeader = request.headers.get("authorization");

    if (
        !process.env.CRON_SECRET ||
        authHeader !== `Bearer ${process.env.CRON_SECRET}`
    ) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const db = await getDatabase();

        const candidates = await db
            .collection("bookings")
            .find(
                {
                    paymentStatus: "paid",
                    $and: [
                        {
                            $or: [
                                { paymentEmailAttempts: { $lt: MAX_ATTEMPTS } },
                                { paymentEmailAttempts: { $exists: false } },
                            ],
                        },
                        {
                            $or: [
                                { paymentEmailStatus: { $in: ["pending", "failed"] } },
                                { paymentEmailStatus: { $exists: false } },
                                {
                                    paymentEmailStatus: "sending",
                                    paymentEmailLastAttemptAt: {
                                        $lte: new Date(Date.now() - 10 * 60 * 1000),
                                    },
                                },
                            ],
                        },
                    ],
                }
            )
            .limit(BATCH_SIZE)
            .toArray();

        let sent = 0;
        let failed = 0;
        let skipped = 0;

        for (const candidate of candidates) {
            const bookingId = candidate._id.toString();


            const attempts = Number(candidate.paymentEmailAttempts ?? 0);
            const lastAttemptAt = candidate.paymentEmailLastAttemptAt;

            const retryDelayMs =
                attempts === 0
                    ? 0
                    : attempts === 1
                        ? 5 * 60 * 1000
                        : 30 * 60 * 1000;

            const isStaleSending =
                candidate.paymentEmailStatus === "sending" &&
                lastAttemptAt instanceof Date &&
                Date.now() - lastAttemptAt.getTime() >= 10 * 60 * 1000;

            if (
                !isStaleSending &&
                lastAttemptAt instanceof Date &&
                Date.now() - lastAttemptAt.getTime() < retryDelayMs
            ) {
                skipped++;
                continue;
            }

            const claimed = await claimPaymentEmailAttempt(
                bookingId,
                MAX_ATTEMPTS
            );


            if (!claimed) {
                skipped++;
                continue;
            }

            try {
                const booking = await getBookingById(bookingId);

                if (!booking) {
                    await updatePaymentEmailStatus(
                        bookingId,
                        "failed",
                        "Booking not found"
                    );
                    failed++;
                    continue;
                }

                const user = await getUserByEmail(booking.userId);

                if (!user) {
                    await updatePaymentEmailStatus(
                        bookingId,
                        "failed",
                        "User not found"
                    );
                    failed++;
                    continue;
                }

                const result = await sendPaymentConfirmationEmail({
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
                    paidAt: booking.updatedAt,
                });

                if (result.error) {
                    await updatePaymentEmailStatus(
                        bookingId,
                        "failed",
                        result.error.message
                    );
                    failed++;
                    continue;
                }

                await updatePaymentEmailStatus(bookingId, "sent");
                sent++;
            } catch (error) {
                const message =
                    error instanceof Error ? error.message : String(error);

                try {
                    await updatePaymentEmailStatus(bookingId, "failed", message);
                } catch (statusError) {
                    console.error(
                        `Could not update email status for booking ${bookingId}:`,
                        statusError
                    );
                }

                console.error(
                    `Payment email retry failed for booking ${bookingId}:`,
                    error
                );
                failed++;
            }
        }

        return NextResponse.json({
            success: true,
            processed: candidates.length,
            sent,
            failed,
            skipped,
        });
    } catch (error) {
        console.error("Payment email retry cron failed:", error);

        return NextResponse.json(
            { success: false, message: "Retry job failed." },
            { status: 500 }
        );
    }
}

