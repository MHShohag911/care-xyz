import type { Service } from "@/types/service";
import Link from "next/link";
import { Button } from "../ui/Button";

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-default bg-background shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      {/* Image / Placeholder */}
      <div className="flex h-48 items-center justify-center bg-primary/10">
        <div className="text-6xl">❤️</div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight">
          {service.name}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-6 text-default-500">
          {service.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-default-500">Starting from</p>

            <p className="mt-1 font-semibold">
              ৳{service.hourlyRate.toLocaleString()}
              <span className="font-normal text-default-500"> / hour</span>
            </p>
          </div>

          <Link href={`/services/${service._id}`}>
            <Button variant="outline">
              View Service
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}