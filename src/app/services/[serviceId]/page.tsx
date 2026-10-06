import { getServiceById } from "@/models/service";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";

interface ServiceDetailsPageProps {
  params: Promise<{
    serviceId: string;
  }>;
}

const ServiceDetailsPage = async ({
  params,
}: ServiceDetailsPageProps) => {
  const { serviceId } = await params;

  const service = await getServiceById(serviceId);

  if (!service) {
    notFound();
  }

  return (
    <main>
      {/* Header */}
      <section className="border-b border-default bg-default-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <Link
            href="/services"
            className="text-sm font-medium text-primary hover:underline"
          >
            ← Back to Services
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">
              Care Service
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {service.name}
            </h1>

            <p className="mt-5 text-lg leading-8 text-default-500">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_380px]">
          {/* Main Content */}
          <div>
            {/* Visual Placeholder */}
            <div className="flex h-72 items-center justify-center rounded-3xl bg-primary/10">
              <span className="text-7xl">❤️</span>
            </div>

            {/* Features */}
            <div className="mt-10">
              <h2 className="text-2xl font-bold">
                What's included
              </h2>

              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="rounded-xl border border-default bg-background p-4"
                  >
                    <span className="font-medium">✓</span>{" "}
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pricing Card */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-default bg-background p-6 shadow-sm">
              <h2 className="text-xl font-semibold">
                Service Pricing
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-default-500">
                    Hourly
                  </span>

                  <span className="font-semibold">
                    ৳{service.hourlyRate.toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-default-500">
                    Daily
                  </span>

                  <span className="font-semibold">
                    ৳{service.dailyRate.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="my-6 border-t border-default" />

              <Link
                href={`/booking/${service._id}`}
                className="block"
              >
                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                >
                  Book This Service
                </Button>
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default ServiceDetailsPage;