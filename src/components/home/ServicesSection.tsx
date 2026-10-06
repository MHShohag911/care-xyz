import { Service } from "@/types/service";
import { Button } from "../ui/Button";
import Link from "next/link";
import { ServiceCard } from "../services/ServiceCard";

interface ServicesSectionProps {
    services: Service[];
}

const ServicesSection = ({ services }: ServicesSectionProps) => {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                        Our Services
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Care services for your family's needs
                    </h2>

                    <p className="mt-4 text-default-500">
                        Choose the care service that best fits your requirements.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-3">
                    {services.map((service) => (
                        <ServiceCard key={service._id} service={service}></ServiceCard>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <Link href="/services">
                        <Button variant="outline">
                            View All Services
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;