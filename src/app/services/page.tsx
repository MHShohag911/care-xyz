import { ServiceCard } from "@/components/services/ServiceCard";
import { getServices } from "@/models/service";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <main className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-3xl font-bold">Our Services</h1>

      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </main>
  );
}