import type { Service } from "@/types/service";
import Link from "next/link";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="rounded-xl border p-6">
      <h2 className="text-xl font-semibold">{service.name}</h2>

      <p className="mt-3 text-gray-600">
        {service.description}
      </p>

      <p className="mt-4 font-medium">
        ৳{service.hourlyRate} / hour
      </p>

      <Link
        href={`/services/${service._id}`}
        className="mt-6 inline-block rounded-lg border px-4 py-2 text-sm font-medium"
      >
        View Details
      </Link>
    </article>
  );
}