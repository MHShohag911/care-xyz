"use server";

import { getServiceById } from "@/models/service";
import { bookingSchema } from "@/validations/booking.schema";
import { cancelBooking as cancelBookingModel, createBooking as insertBooking } from "@/models/booking";
import { auth } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function createBooking(
    serviceId: string,
    data: unknown
) {
    if (!ObjectId.isValid(serviceId)) {
        return {
            success: false,
            message: "Invalid service.",
        };
    }

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

    try {
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
            paymentStatus: "unpaid",
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return {
            success: true,
            message: "Booking created successfully.",
            bookingId,
        };
    } catch (error) {
        console.error("Failed to create booking:", error);

        return {
            success: false,
            message: "Something went wrong while creating your booking. Please try again.",
        };
    }


}

export async function cancelBooking(bookingId: string) {
    const session = await auth();

    if (!session?.user?.email) {
        return {
            success: false,
            message: "You must be logged in."
        };
    }

    try {
        const cancelled = await cancelBookingModel(
            bookingId,
            session.user.email
        );

        if (!cancelled) {
            return {
                success: false,
                message: "Booking could not be cancelled. It may not exist, may belong to another user, or may already be completed or cancelled.",
            };
        }

        return {
            success: true,
            message: "Booking cancelled successfully."
        };
    } catch (error) {
        console.error("Failed to cancel booking: ", error);

        return {
            success: false,
            message: "Something went wrong. Please try again."
        }
    }
}