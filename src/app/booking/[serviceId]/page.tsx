
import BookingForm from "@/components/booking/BookingForm";
import { auth } from "@/lib/auth";
import { getServiceById } from "@/models/service";
import { notFound, redirect } from "next/navigation";

interface BookingPageProps {
    params: Promise<{
        serviceId: string;
    }>
}

const BookingPage = async ({ params }: BookingPageProps) => {
    const session = await auth();
    const { serviceId } = await params;

    if(!session?.user){
        redirect(`/login?callbackUrl=${encodeURIComponent(`/booking/${serviceId}`)}`);
    }

    const service = await getServiceById(serviceId);
    if (!service) {
        notFound();
    }

    return (
        <div className="mx-auto max-w-3xl px-6 py-12">
            <h1 className="text-3xl font-bold">Book {service.name}</h1>

            <p className="mt-3 text-gray-600">
                Choose your preferred duration and location.
            </p>

            <div className="mt-8 rounded-xl border p-6">
                <p>
                    <strong>Hourly rate:</strong> ৳{service.hourlyRate}
                </p>

                <p className="mt-2">
                    <strong>Daily rate:</strong> ৳{service.dailyRate}
                </p>
            </div>

            <BookingForm service={service}></BookingForm>
        </div>
    );
};

export default BookingPage;