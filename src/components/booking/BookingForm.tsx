"use client";

import { Service } from "@/types/service";
import { BookingFormData, bookingSchema } from "@/validations/booking.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface BookingFormProps {
    service: Service;
}

const BookingForm = ({ service }: BookingFormProps) => {
    const {
    register,
    handleSubmit,
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

  const onSubmit = (data: BookingFormData) => {
    console.log(data);
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

                    <input
                        id="division"
                        {...register("division")}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                        placeholder="Enter division"
                    />

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

                    <input
                        id="district"
                        {...register("district")}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                        placeholder="Enter district"
                    />

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

                    <input
                        id="city"
                        {...register("city")}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                        placeholder="Enter city"
                    />

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

                    <input
                        id="area"
                        {...register("area")}
                        className="mt-2 w-full rounded-lg border px-4 py-3"
                        placeholder="Enter area"
                    />

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
                        Hourly rate: ৳{service.hourlyRate}
                    </p>

                    <p className="mt-2 text-lg font-semibold">
                        Total: ৳0
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