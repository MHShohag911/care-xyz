"use client";

import { cancelBooking } from "@/actions/booking.actions";
import { Button } from "@heroui/react";
import { useState } from "react";

interface CancelBookingButtonProps {
  bookingId: string;
}

const CancelBookingButton = ({
  bookingId,
}: CancelBookingButtonProps) => {
  const [loading, setLoading] = useState(false);

  const handleCancel = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmed) {
      return;
    }

    setLoading(true);

    const result = await cancelBooking(bookingId);

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    window.location.reload();
  };

  return (
    <Button
      type="button"
      variant="danger"
      onPress={handleCancel}
      isDisabled={loading}
      className="w-full"
    >
      {loading ? "Cancelling..." : "Cancel Booking"}
    </Button>
  );
};

export default CancelBookingButton;