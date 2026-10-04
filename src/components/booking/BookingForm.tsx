"use client";

import { locationData } from "@/data/locations";
import { Service } from "@/types/service";
import { BookingFormData, bookingSchema } from "@/validations/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

interface BookingFormProps {
    service: Service;
}

const BookingForm = ({ service }: BookingFormProps) => {
    const [selectedDivision, setSelectedDivision] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            durationType: "hour",
            durationValue: 1,
            division: "",
            district: "",
            city: "",
            area: "",
            address: "",
            phone: "",
        },
    });

    const durationType = useWatch({
        control,
        name: "durationType",
    });

    const durationValue = useWatch({
        control,
        name: "durationValue",
    });

    const rate =
        durationType === "day"
            ? service.dailyRate
            : service.hourlyRate;

    const totalCost =
        Number.isFinite(durationValue) && durationValue > 0
            ? durationValue * rate
            : 0;

    const onSubmit = (data: BookingFormData) => {
        console.log({
            ...data,
            serviceId: service._id,
            serviceName: service.name,
            totalCost,
        });
    };
    return (
        <div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-8 space-y-6"
            >
                {/* Duration Type */}
                <div>
                    <label
                        htmlFor="durationType"
                        className="block text-sm font-medium"
                    >
                        Duration Type
                    </label>

                    <select
                        id="durationType"
                        {...register("durationType")}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                    >
                        <option value="hour">Hour</option>
                        <option value="day">Day</option>
                    </select>

                    {errors.durationType && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.durationType.message}
                        </p>
                    )}
                </div>

                {/* Duration */}
                <div>
                    <label
                        htmlFor="durationValue"
                        className="block text-sm font-medium"
                    >
                        Duration
                    </label>

                    <input
                        id="durationValue"
                        type="number"
                        min="1"
                        {...register("durationValue", {
                            valueAsNumber: true,
                        })}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                    />

                    {errors.durationValue && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.durationValue.message}
                        </p>
                    )}
                </div>

                {/* Division */}
                <div>
                    <label
                        htmlFor="division"
                        className="block text-sm font-medium"
                    >
                        Division
                    </label>

                    <select
                        id="division"
                        {...register("division")}
                        onChange={(event) => {
                            const division = event.target.value;

                            setSelectedDivision(division);
                            setSelectedDistrict("");
                            setSelectedCity("");

                            setValue("district", "");
                            setValue("city", "");
                            setValue("area", "");
                        }}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                    >
                        <option value="">Select division</option>

                        {locationData.map((division) => (
                            <option key={division.name} value={division.name}>
                                {division.name}
                            </option>
                        ))}
                    </select>

                    {errors.division && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.division.message}
                        </p>
                    )}
                </div>

                {/* District */}
                <div>
                    <label
                        htmlFor="district"
                        className="block text-sm font-medium"
                    >
                        District
                    </label>

                    <select
                        id="district"
                        {...register("district")}
                        disabled={!selectedDivision}
                        onChange={(event) => {
                            const district = event.target.value;

                            setSelectedDistrict(district);
                            setSelectedCity("");

                            setValue("city", "");
                            setValue("area", "");
                        }}
                        className="mt-2 w-full rounded-lg border px-4 py-3 disabled:bg-gray-100"
                    >
                        <option value="">Select district</option>

                        {locationData
                            .find((division) => division.name === selectedDivision)
                            ?.districts.map((district) => (
                                <option key={district.name} value={district.name}>
                                    {district.name}
                                </option>
                            ))}
                    </select>

                    {errors.district && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.district.message}
                        </p>
                    )}
                </div>

                {/* City */}
                <div>
                    <label
                        htmlFor="city"
                        className="block text-sm font-medium"
                    >
                        City
                    </label>

                    <select
                        id="city"
                        {...register("city")}
                        disabled={!selectedDistrict}
                        onChange={(event) => {
                            const city = event.target.value;

                            setSelectedCity(city);
                            setValue("area", "");
                        }}
                        className="mt-2 w-full rounded-lg border px-4 py-3 disabled:bg-gray-100"
                    >
                        <option value="">Select city</option>

                        {locationData
                            .flatMap((division) => division.districts)
                            .find((district) => district.name === selectedDistrict)
                            ?.cities.map((city) => (
                                <option key={city.name} value={city.name}>
                                    {city.name}
                                </option>
                            ))}
                    </select>

                    {errors.city && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.city.message}
                        </p>
                    )}
                </div>

                {/* Area */}
                <div>
                    <label
                        htmlFor="area"
                        className="block text-sm font-medium"
                    >
                        Area
                    </label>

                    <select
                        id="area"
                        {...register("area")}
                        disabled={!selectedCity}
                        className="mt-2 w-full rounded-lg border px-4 py-3 disabled:bg-gray-100"
                    >
                        <option value="">Select area</option>

                        {locationData
                            .flatMap((division) => division.districts)
                            .flatMap((district) => district.cities)
                            .find((city) => city.name === selectedCity)
                            ?.areas.map((area) => (
                                <option key={area.name} value={area.name}>
                                    {area.name}
                                </option>
                            ))}
                    </select>

                    {errors.area && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.area.message}
                        </p>
                    )}
                </div>

                {/* Address */}
                <div>
                    <label
                        htmlFor="address"
                        className="block text-sm font-medium"
                    >
                        Full Address
                    </label>

                    <textarea
                        id="address"
                        {...register("address")}
                        rows={4}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                        placeholder="Enter your full address"
                    />

                    {errors.address && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.address.message}
                        </p>
                    )}
                </div>

                {/* Phone */}
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium"
                    >
                        Phone Number
                    </label>

                    <input
                        id="phone"
                        type="tel"
                        {...register("phone")}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                        placeholder="Enter your phone number"
                    />

                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.phone.message}
                        </p>
                    )}
                </div>

                {/* Price */}
                <div className="rounded-lg border p-4">
                    <p className="font-medium">
                        Hourly rate: ৳{rate}/{durationType}
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                        Total: ৳{totalCost}
                    </p>
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-black px-5 py-3 font-medium text-white"
                >
                    Confirm Booking
                </button>
            </form>
        </div>
    );
};

export default BookingForm;