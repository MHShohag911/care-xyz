"use server";

import { bookingSchema } from "@/validations/booking.schema";

export async function validateBooking(data: unknown){
    const result = bookingSchema.safeParse(data);

    if(!result.success){
        return {
            success: false,
            message: "Please check your booking information.",
            errors: result.error.flatten().fieldErrors,
        };
    }

    return {
        success: true,
        data: result.data,
    }
}