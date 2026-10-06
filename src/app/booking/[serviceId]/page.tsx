import BookingForm from "@/components/booking/BookingForm";
import { Button } from "@/components/ui/Button";
import { auth } from "@/lib/auth";
import { getServiceById } from "@/models/service";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface BookingPageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

const BookingPage = async ({ params }: BookingPageProps) => {
  const session = await auth();
  const { serviceId } = await params;

  if (!session?.user) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(`/booking/${serviceId}`)}`
    );
  }

  const service = await getServiceById(serviceId);

  if (!service) {
    notFound();
  }

  return (
    <main className="bg-default-50">
      <div className="mx-auto max-w-5xl px-6 py-12">
        {/* Back Link */}
        <Link
          href={`/services/${service._id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          ← Back to Service
        </Link>

        {/* Page Header */}
        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">
            Booking
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
            Book {service.name}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-7 text-default-500">
            Choose your preferred duration, location, and contact information
            to complete your booking.
          </p>
        </div>

        {/* Booking Layout */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* Booking Form */}
          <section className="rounded-2xl border border-default bg-background p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold">
              Booking Details
            </h2>

            <p className="mt-2 text-sm text-default-500">
              Provide the information needed for your care service.
            </p>

            <div className="mt-8">
              <BookingForm service={service} />
            </div>
          </section>

          {/* Pricing Summary */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-default bg-background p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                Service Summary
              </h2>

              <p className="mt-2 text-sm text-default-500">
                {service.name}
              </p>

              <div className="my-6 border-t border-default" />

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-default-500">
                    Hourly rate
                  </span>

                  <span className="font-semibold">
                    ৳{service.hourlyRate.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-default-500">
                    Daily rate
                  </span>

                  <span className="font-semibold">
                    ৳{service.dailyRate.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-default" />

              <p className="text-sm leading-6 text-default-500">
                The final price will be calculated based on the duration you
                select.
              </p>

              <Link href={`/services/${service._id}`} className="mt-6 block">
                <Button variant="outline" className="w-full ">
                  View Service
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;