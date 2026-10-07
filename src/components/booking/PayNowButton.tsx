"use client";

import { createCheckoutSession } from "@/actions/payment.actions";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface PayNowButtonProps {
    bookingId: string;
}

const PayNowButton = ({
    bookingId,
}: PayNowButtonProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePayment = async () => {
        setLoading(true);

        try {
            const result = await createCheckoutSession(bookingId);

            if (!result.success || !result.url) {
                alert(result.message);
                return;
            }
            router.push(result.url)
        } catch (error) {
            console.error("payment initialization failed: ", error);
            alert("Something went wrong. Pleas try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <Button
            type="button"
            variant="primary"
            onPress={handlePayment}
            isDisabled={loading}
            className="w-full"
        >
            {loading ? "Preparing Payment..." : "Pay Now"}
        </Button>
    );
};

export default PayNowButton;