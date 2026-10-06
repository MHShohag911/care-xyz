import { ServiceCard } from "@/components/services/ServiceCard";
import { getServices } from "@/models/service";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">
          Our Services
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          Care services for every stage of life
        </h1>

        <p className="mt-4 text-lg leading-7 text-default-500">
          Choose from our trusted care services and find the right support
          for your family.
        </p>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </main>
  );
}