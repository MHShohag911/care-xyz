import { resend } from "../resend";

interface PaymentConfirmationData {
  bookingId: string;
  customerName: string;
  customerEmail: string;
  serviceName: string;
  duration: {
    type: "hour" | "day";
    value: number;
  };
  phone: string;
  location: {
    division: string;
    district: string;
    city: string;
    area: string;
    address: string;
  };
  totalCost: number;
  paymentMethod: string;
  paymentStatus: string;
  paidAt: Date;
}

export function paymentConfirmationTemplate({
  bookingId,
  customerName,
//   customerEmail,
  serviceName,
  duration,
  phone,
  location,
  totalCost,
  paymentMethod,
  paymentStatus,
  paidAt,
}: PaymentConfirmationData) {
  return `
    <div style="margin: 0; padding: 40px 20px; background-color: #f4f4f5; font-family: Arial, Helvetica, sans-serif;">
      <div style="max-width: 680px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e4e4e7;">

        <div style="padding: 28px 32px; border-bottom: 1px solid #e4e4e7;">
          <h1 style="margin: 0; font-size: 24px; color: #18181b;">
            Care<span style="color: #006fee;">.xyz</span>
          </h1>
          <p style="margin: 8px 0 0; color: #71717a; font-size: 14px;">
            Payment Confirmation &amp; Receipt
          </p>
        </div>

        <div style="padding: 32px;">
          <h2 style="margin: 0 0 8px; font-size: 22px; color: #18181b;">
            Payment successful
          </h2>

          <p style="margin: 0 0 24px; color: #52525b; line-height: 1.6;">
            Hi ${customerName}, your payment has been successfully received.
            Your booking is now confirmed.
          </p>

          <div style="padding: 18px; margin-bottom: 24px; background-color: #f4f4f5; border-radius: 10px;">
            <p style="margin: 0 0 8px; font-size: 13px; color: #71717a;">
              Booking ID
            </p>
            <p style="margin: 0; font-weight: bold; color: #18181b;">
              ${bookingId}
            </p>
          </div>

          <h3 style="margin: 0 0 14px; font-size: 16px; color: #18181b;">
            Booking Details
          </h3>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #71717a;">Service</td>
              <td style="padding: 10px 0; text-align: right; color: #18181b; font-weight: 600;">
                ${serviceName}
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 0; color: #71717a;">Duration</td>
              <td style="padding: 10px 0; text-align: right; color: #18181b;">
                ${duration.value} ${duration.type}${duration.value === 1 ? "" : "s"}
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 0; color: #71717a;">Phone</td>
              <td style="padding: 10px 0; text-align: right; color: #18181b;">
                ${phone}
              </td>
            </tr>
          </table>

          <h3 style="margin: 28px 0 14px; font-size: 16px; color: #18181b;">
            Care Location
          </h3>

          <p style="margin: 0; color: #52525b; line-height: 1.6;">
            ${location.address}<br />
            ${location.area}, ${location.city}<br />
            ${location.district}, ${location.division}
          </p>

          <h3 style="margin: 28px 0 14px; font-size: 16px; color: #18181b;">
            Payment Details
          </h3>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
            <tr>
              <td style="padding: 10px 0; color: #71717a;">Payment Method</td>
              <td style="padding: 10px 0; text-align: right; color: #18181b;">
                ${paymentMethod}
              </td>
            </tr>

            <tr>
              <td style="padding: 10px 0; color: #71717a;">Payment Status</td>
              <td style="padding: 10px 0; text-align: right; color: #18181b; font-weight: 600;">
                ${paymentStatus}
              </td>
            </tr>

            <tr>
              <td style="padding: 14px 0 0; color: #18181b; font-size: 16px; font-weight: 600; border-top: 1px solid #e4e4e7;">
                Total Paid
              </td>
              <td style="padding: 14px 0 0; text-align: right; color: #18181b; font-size: 18px; font-weight: 700; border-top: 1px solid #e4e4e7;">
                ৳${totalCost.toLocaleString()}
              </td>
            </tr>
          </table>

          <p style="margin: 28px 0 0; color: #71717a; font-size: 13px;">
            Paid on ${paidAt.toLocaleString("en-BD", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>

        <div style="padding: 24px 32px; background-color: #fafafa; border-top: 1px solid #e4e4e7;">
          <p style="margin: 0; color: #71717a; font-size: 13px; line-height: 1.6;">
            Thank you for choosing Care.xyz. If you have any questions about
            your booking or payment, please contact our support team.
          </p>

          <p style="margin: 12px 0 0; color: #a1a1aa; font-size: 12px;">
            This is an automated payment confirmation email.
          </p>
        </div>

      </div>
    </div>
  `;
}

export async function sendPaymentConfirmationEmail(
  data: PaymentConfirmationData
) {
  const html = paymentConfirmationTemplate(data);

  return resend.emails.send({
    from: "Care.xyz <onboarding@resend.dev>",
    to: data.customerEmail,
    subject: `Payment Confirmed - Care.xyz | Booking ${data.bookingId}`,
    html,
  });
}