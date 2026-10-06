"use client";

import { cancelBooking } from "@/actions/booking.actions";
import { Button } from "@heroui/react";
import { useState } from "react";

interface CancelBookingButtonProps {
    bookingId: string;
}

const CancelBookingButton = ({ bookingId }: CancelBookingButtonProps) => {
    const [loading, setLoading] = useState(false);

    const handleCancel = async () => {
        const confirmed = window.confirm("Are you sure you want to cancel this booking?");

        if(!confirmed){
            return;
        }

        setLoading(true);

        const result = await cancelBooking(bookingId);
        
        setLoading(false);

        if(!result.success){
            alert(result.message);
            return;
        }
        window.location.reload();
    }
    return (
        <div>
            <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Cancelling..." : "Cancel Booking"}
            </button>
        </div>
    );
};

export default CancelBookingButton;