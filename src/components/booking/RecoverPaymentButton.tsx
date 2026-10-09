"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { recoverExistingBookingPayment } from "@/actions/booking.actions";

export default function RecoverPaymentButton() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function handleRecovery() {
        setLoading(true);
        setMessage("");

        try {
            const result = await recoverExistingBookingPayment(
                "6ac79b95ae774ec28e72fe12",
                "cs_test_a1YV7lTJWXqu64HHfOq7j23EkjcqA1ODRcOJgbFYHTR0EC94xn5qJgHOPs",
                "pi_3UOHRkGeRj0riLIA194W5BlA"
            );

            setMessage(result.message);

            if (result.success) {
                router.refresh();
            }
        } catch {
            setMessage("Recovery failed. Check the server logs.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="mt-4 space-y-3">
            <Button
                variant="primary"
                onPress={handleRecovery}
                isDisabled={loading}
            >
                {loading ? "Verifying Payment..." : "Recover Existing Payment"}
            </Button>

            {message && (
                <p role="status" className="text-sm">
                    {message}
                </p>
            )}
        </div>
    );
}
