import BookingStatusBadge from "@/components/booking/BookingStatusBadge";
import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { getBookingsByUserId } from "@/models/booking";
import Link from "next/link";
import { redirect } from "next/navigation";

const MyBookingsPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const bookings = await getBookingsByUserId(session.user.email);

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-default-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Page Header */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Booking History
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            My Bookings
          </h1>

          <p className="mt-4 text-lg leading-7 text-default-500">
            View and manage your care service bookings from one place.
          </p>
        </div>

        {/* Empty State */}
        {bookings.length === 0 ? (
          <section className="mt-10 rounded-2xl border border-default bg-background p-10 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-3xl">
              📋
            </div>

            <h2 className="mt-5 text-xl font-semibold">
              No bookings yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-default-500">
              You haven't made any care service bookings yet. Explore our
              services and find the right care option for your needs.
            </p>

            <div className="mt-6">
              <Link href="/services">
                <Button variant="primary">
                  Explore Services
                </Button>
              </Link>
            </div>
          </section>
        ) : (
          /* Booking List */
          <section className="mt-10 space-y-5">
            {bookings.map((booking) => (
              <article
                key={booking._id}
                className="rounded-2xl border border-default bg-background p-6 shadow-sm transition duration-200 hover:shadow-md sm:p-7"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-sm text-default-500">
                      Care Service
                    </p>

                    <h2 className="mt-1 text-xl font-semibold tracking-tight">
                      {booking.serviceName}
                    </h2>
                  </div>

                  <BookingStatusBadge status={booking.status} />
                </div>

                <div className="my-6 border-t border-default" />

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <p className="text-sm text-default-500">
                      Duration
                    </p>

                    <p className="mt-1 font-medium">
                      {booking.duration.value}{" "}
                      {booking.duration.type === "hour"
                        ? booking.duration.value === 1
                          ? "hour"
                          : "hours"
                        : booking.duration.value === 1
                          ? "day"
                          : "days"}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-default-500">
                      Total Cost
                    </p>

                    <p className="mt-1 font-semibold">
                      ৳{booking.totalCost.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-default-500">
                      Location
                    </p>

                    <p className="mt-1 font-medium">
                      {booking.location.city},{" "}
                      {booking.location.district}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-end border-t border-default pt-5">
                  <Link href={`/my-bookings/${booking._id}`}>
                    <Button variant="outline">
                      View Details
                    </Button>
                  </Link>
                </div>
              </article>
            ))}
          </section>
        )}
      </div>
    </main>
  );
};

export default MyBookingsPage;