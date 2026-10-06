import BookingStatusBadge from "@/components/booking/BookingStatusBadge";
import CancelBookingButton from "@/components/booking/CancelBookingButton";
import { auth } from "@/lib/auth";
import { getBookingById } from "@/models/booking";
import { notFound, redirect } from "next/navigation";

const BookingDetailsPage = async ({ params }: { params: Promise<{ bookingId: string }> }) => {
    const { bookingId } = await params;
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/login");
    }

    const booking = await getBookingById(bookingId);

    if (!booking || booking.userId !== session.user.email) {
        notFound();
    }
    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-3xl font-bold">Booking Details</h1>

            <div className="mt-6 space-y-4 rounded-xl border p-6">
                <p>
                    <strong>Booking ID:</strong> {booking._id}
                </p>

                <p>
                    <strong>Service:</strong> {booking.serviceName}
                </p>

                <p>
                    <strong>Duration:</strong> {booking.duration.value}{" "}
                    {booking.duration.type === "hour" ? "hour(s)" : "day(s)"}
                </p>

                <p>
                    <strong>Total Cost:</strong> ৳{booking.totalCost}
                </p>

                <div className="flex items-center gap-2">
                    <strong>Status:</strong>
                    <BookingStatusBadge status={booking.status} />
                </div>

                {booking.status !== "cancelled" &&
                    booking.status !== "completed" && (
                        <CancelBookingButton bookingId={booking._id!} />
                    )}

                <p>
                    <strong>Phone:</strong> {booking.phone}
                </p>

                <p>
                    <strong>Address:</strong>{" "}
                    {[
                        booking.location.area,
                        booking.location.city,
                        booking.location.district,
                        booking.location.division,
                        booking.location.address,
                    ]
                        .filter(Boolean)
                        .join(", ")}
                </p>

                <p>
                    <strong>Booked On:</strong>{" "}
                    {new Date(booking.createdAt).toLocaleDateString("en-BD")}
                </p>
            </div>
        </div>
    );
};

export default BookingDetailsPage;