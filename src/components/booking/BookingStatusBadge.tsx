import { BookingStatus } from "@/types/booking";

interface BookingStatusBadgeProps {
    status: BookingStatus;
}

const statusStyles: Record<BookingStatus, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    confirmed: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
};

const BookingStatusBadge = ({ status }: BookingStatusBadgeProps) => {

    return (
        <div>
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium capitalize ${statusStyles[status]}`}>{status}</span>
        </div>
    );
};

export default BookingStatusBadge;