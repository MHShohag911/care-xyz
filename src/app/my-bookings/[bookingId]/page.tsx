import BookingStatusBadge from "@/components/booking/BookingStatusBadge";
import PaymentStatusBadge from "@/components/booking/PaymentStatusBadge";
import CancelBookingButton from "@/components/booking/CancelBookingButton";
import PayNowButton from "@/components/booking/PayNowButton";
import { auth } from "@/lib/auth";
import { getBookingById } from "@/models/booking";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import RecoverPaymentButton from "@/components/booking/RecoverPaymentButton";

interface BookingDetailsPageProps {
  params: Promise<{
    bookingId: string;
  }>;
}

const BookingDetailsPage = async ({
  params,
}: BookingDetailsPageProps) => {
  const { bookingId } = await params;
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const booking = await getBookingById(bookingId);

  if (!booking || booking.userId !== session.user.email) {
    notFound();
  }

  const formattedAddress = [
    booking.location.area,
    booking.location.city,
    booking.location.district,
    booking.location.division,
    booking.location.address,
  ]
    .filter(Boolean)
    .join(", ");

  const formattedDuration =
    booking.duration.value === 1
      ? booking.duration.type === "hour"
        ? "1 hour"
        : "1 day"
      : booking.duration.type === "hour"
        ? `${booking.duration.value} hours`
        : `${booking.duration.value} days`;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-default-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Back Navigation */}
        <Link
          href="/my-bookings"
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to My Bookings
        </Link>

        {/* Header */}
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Booking Details
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
              {booking.serviceName}
            </h1>

            <p className="mt-3 text-default-500">
              Review your booking information and manage your booking.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <BookingStatusBadge status={booking.status} />
            <PaymentStatusBadge status={booking.paymentStatus} />
          </div>
        </div>

        {/* Main Content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Booking Information */}
          <section className="rounded-2xl border border-default bg-background shadow-sm">
            <div className="border-b border-default px-6 py-5 sm:px-8">
              <h2 className="text-xl font-semibold">
                Booking Information
              </h2>

              <p className="mt-1 text-sm text-default-500">
                Details of your selected care service.
              </p>
            </div>

            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
              <div>
                <p className="text-sm text-default-500">
                  Booking ID
                </p>

                <p className="mt-1 break-all font-medium">
                  {booking._id}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  Service
                </p>

                <p className="mt-1 font-medium">
                  {booking.serviceName}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  Duration
                </p>

                <p className="mt-1 font-medium">
                  {formattedDuration}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  Booked On
                </p>

                <p className="mt-1 font-medium">
                  {new Date(booking.createdAt).toLocaleDateString(
                    "en-BD",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
            </div>
          </section>

          {/* Summary */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-default bg-background p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                Booking Summary
              </h2>

              <div className="mt-6 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-default-500">
                    Service
                  </span>

                  <span className="text-right font-medium">
                    {booking.serviceName}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-default-500">
                    Duration
                  </span>

                  <span className="font-medium">
                    {formattedDuration}
                  </span>
                </div>

                <div className="border-t border-default" />

                <div className="flex items-center justify-between gap-4">
                  <span className="font-medium">
                    Total Cost
                  </span>

                  <span className="text-xl font-bold">
                    ৳{booking.totalCost.toLocaleString()}
                  </span>
                </div>
              </div>

              {booking.status === "pending" &&
                booking.paymentStatus === "unpaid" && (
                  <div className="mt-6 border-t border-default pt-6">
                    <PayNowButton bookingId={booking._id!} />
                  </div>
                )}

              {booking.status !== "cancelled" &&
                booking.status !== "completed" && (
                  <div className="mt-4">
                    <CancelBookingButton bookingId={booking._id!} />
                  </div>
                )}

              {process.env.NODE_ENV === "development" &&
                booking._id?.toString() === "6ac79b95ae774ec28e72fe12" &&
                booking.status === "confirmed" &&
                booking.paymentStatus === "paid" &&
                !booking.stripePaymentIntentId && (
                  <RecoverPaymentButton />
                )}
            </div>
          </aside>

          {/* Contact & Location */}
          <section className="rounded-2xl border border-default bg-background shadow-sm lg:col-span-2">
            <div className="border-b border-default px-6 py-5 sm:px-8">
              <h2 className="text-xl font-semibold">
                Contact & Care Location
              </h2>

              <p className="mt-1 text-sm text-default-500">
                Information provided for this booking.
              </p>
            </div>

            <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
              <div>
                <p className="text-sm text-default-500">
                  Phone Number
                </p>

                <p className="mt-1 font-medium">
                  {booking.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  Division
                </p>

                <p className="mt-1 font-medium">
                  {booking.location.division}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  District
                </p>

                <p className="mt-1 font-medium">
                  {booking.location.district}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  City
                </p>

                <p className="mt-1 font-medium">
                  {booking.location.city}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  Area
                </p>

                <p className="mt-1 font-medium">
                  {booking.location.area}
                </p>
              </div>

              <div>
                <p className="text-sm text-default-500">
                  Full Address
                </p>

                <p className="mt-1 font-medium">
                  {booking.location.address}
                </p>
              </div>
            </div>

            <div className="border-t border-default px-6 py-5 sm:px-8">
              <p className="text-sm text-default-500">
                Complete Location
              </p>

              <p className="mt-1 leading-6">
                {formattedAddress}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default BookingDetailsPage;