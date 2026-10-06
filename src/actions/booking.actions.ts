"use server";

import { getServiceById } from "@/models/service";
import { bookingSchema } from "@/validations/booking.schema";
import { cancelBooking as cancelBookingModel, createBooking as insertBooking } from "@/models/booking";
import { auth } from "@/lib/auth";


export async function validateBooking(data: unknown) {
    const result = bookingSchema.safeParse(data);

    if (!result.success) {
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

export async function checkBookingAuth() {
    const session = await auth();

    if (!session?.user?.email) {
        return {
            success: false,
            message: "You must be logged in to create a booking.",
        };
    }

    return {
        success: true,
        email: session.user.email,
    };
}


export async function createBooking(
    serviceId: string,
    data: unknown
) {
    const session = await auth();
    if (!session?.user?.email) {
        return {
            success: false,
            message: "You must be logged in to create a booking.",
        };
    }

    const result = bookingSchema.safeParse(data);

    if (!result.success) {
        return {
            success: false,
            message: "please check your booking information.",
            errors: result.error.flatten().fieldErrors,
        };
    }

    const service = await getServiceById(serviceId);

    if (!service) {
        return {
            success: false,
            message: "Service not found.",
        };
    }

    const { durationType, durationValue } = result.data;

    const rate =
        durationType === "day"
            ? service.dailyRate
            : service.hourlyRate;

    const totalCost = durationValue * rate;

    const bookingId = await insertBooking({
        userId: session.user.email,
        serviceId: service._id!,
        serviceName: service.name,
        duration: {
            type: durationType,
            value: durationValue,
        },
        location: {
            division: result.data.division,
            district: result.data.district,
            city: result.data.city,
            area: result.data.area,
            address: result.data.address,
        },
        phone: result.data.phone,
        totalCost,
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
    });

    return {
        success: true,
        message: "Booking created successfully.",
        bookingId,
    };
}

export async function cancelBooking(bookingId: string){
    const session = await auth();

    if(!session?.user?.email){
        return {
            success: false,
            message: "You must be logged in."
        };
    }

    const cancelled = await cancelBookingModel(
        bookingId,
        session.user.email
    );

    if(!cancelled){
        return {
            success: false,
            message: "Booking could no be cancelled.",
        };
    }

    return {
        success: true,
        message: "Booking cancelled successfully."
    };
}