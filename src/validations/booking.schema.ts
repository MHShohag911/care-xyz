import { z } from "zod";

export const bookingSchema = z.object({
  durationType: z.enum(["hour", "day"]),
  durationValue: z
    .number()
    .int()
    .min(1, "Duration must be at least 1."),

  division: z.string().min(1, "Division is required."),
  district: z.string().min(1, "District is required."),
  city: z.string().min(1, "City is required."),
  area: z.string().min(1, "Area is required."),
  address: z.string().min(5, "Please enter your full address."),

  phone: z
    .string()
    .min(10, "Please enter a valid phone number."),
});

export type BookingFormData = z.infer<typeof bookingSchema>;