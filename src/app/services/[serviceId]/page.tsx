import { getServiceById } from "@/models/service";
import Link from "next/link";
import { notFound } from "next/navigation";


interface ServiceDetailsPageProps {
    params: Promise<{
        serviceId: string;
    }>
}

const ServiceDetailsPage = async ({ params }: ServiceDetailsPageProps) => {

    const { serviceId } = await params;
    const service = await getServiceById(serviceId);
    if (!service) {
        notFound();
    }
    return (
        <div className="mx-auto max-w-5xl px-6 py-12">
            <h1 className="text-4xl font-bold">{service.name}</h1>

            <p className="mt-4 text-gray-600">
                {service.description}
            </p>

            <div className="mt-8">
                <h2 className="text-2xl font-semibold">Features</h2>

                <ul className="mt-4 list-disc space-y-2 pl-6">
                    {service.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>
            </div>

            <div className="mt-8">
                <p>
                    <strong>Hourly:</strong> ৳{service.hourlyRate}
                </p>

                <p className="mt-2">
                    <strong>Daily:</strong> ৳{service.dailyRate}
                </p>
            </div>

            <div className="mt-8">
                <Link
                    href={`/booking/${service._id}`}
                    className="inline-block rounded-lg bg-black px-5 py-3 font-medium text-white"
                >
                    Book Service
                </Link>
            </div>
        </div>
    );
};

export default ServiceDetailsPage;