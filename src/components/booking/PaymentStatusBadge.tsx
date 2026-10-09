
import type { PaymentStatus } from "@/types/booking";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const styles: Record<PaymentStatus, string> = {
  unpaid: "bg-warning/10 text-warning",
  paid: "bg-success/10 text-success",
  refund_pending: "bg-warning/10 text-warning",
  refunded: "bg-default-100 text-default-600",
};

const labels: Record<PaymentStatus, string> = {
  unpaid: "Unpaid",
  paid: "Paid",
  refund_pending: "Refund Pending",
  refunded: "Refunded",
};

export default function PaymentStatusBadge({
  status,
}: PaymentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
