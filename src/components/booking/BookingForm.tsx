"use client";

import { createBooking } from "@/actions/booking.actions";
import { locationData } from "@/data/locations";
import {
  Button,
  FieldError,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
} from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { Key } from "react-aria-components";
import { useState } from "react";
import { Service } from "@/types/service";
import {
  BookingFormData,
  bookingSchema,
} from "@/validations/booking.schema";

interface BookingFormProps {
  service: Service;
}

const BookingForm = ({ service }: BookingFormProps) => {
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const router = useRouter();

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

  const onSubmit = async (data: BookingFormData) => {
    const result = await createBooking(service._id!, data);

    if (!result.success) {
      console.error(result.message);
      return;
    }

    router.push(`/my-bookings/${result.bookingId}`);
  };

  const getDistricts = () => {
    return (
      locationData.find(
        (division) => division.name === selectedDivision
      )?.districts ?? []
    );
  };

  const getCities = () => {
    return (
      getDistricts().find(
        (district) => district.name === selectedDistrict
      )?.cities ?? []
    );
  };

  const getAreas = () => {
    return (
      getCities().find(
        (city) => city.name === selectedCity
      )?.areas ?? []
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Duration */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">
            Service Duration
          </h3>

          <p className="mt-1 text-sm text-default-500">
            Choose how long you need the care service.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Duration Type */}
          <Controller
            name="durationType"
            control={control}
            render={({ field }) => (
              <Select
                selectedKey={field.value}
                onSelectionChange={(value) => {
                  field.onChange(value);
                }}
                placeholder="Select duration type"
                isInvalid={!!errors.durationType}
                className="w-full"
              >
                <Label>Duration Type</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    <ListBox.Item
                      id="hour"
                      textValue="Hour"
                    >
                      Hour
                      <ListBox.ItemIndicator />
                    </ListBox.Item>

                    <ListBox.Item
                      id="day"
                      textValue="Day"
                    >
                      Day
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>

                {errors.durationType && (
                  <FieldError>
                    {errors.durationType.message}
                  </FieldError>
                )}
              </Select>
            )}
          />

          {/* Duration Value */}
          <TextField
            isInvalid={!!errors.durationValue}
            className="w-full"
          >
            <Label>Duration</Label>

            <Input
              type="number"
              min={1}
              {...register("durationValue", {
                valueAsNumber: true,
              })}
              placeholder="Enter duration"
            />

            {errors.durationValue && (
              <FieldError>
                {errors.durationValue.message}
              </FieldError>
            )}
          </TextField>
        </div>
      </section>

      {/* Location */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">
            Care Location
          </h3>

          <p className="mt-1 text-sm text-default-500">
            Select where the care service will be provided.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Division */}
          <Controller
            name="division"
            control={control}
            render={({ field }) => (
              <Select
                selectedKey={field.value || null}
                onSelectionChange={(value: Key | null) => {
                  const division = value?.toString() ?? "";

                  field.onChange(division);

                  setSelectedDivision(division);
                  setSelectedDistrict("");
                  setSelectedCity("");

                  setValue("district", "");
                  setValue("city", "");
                  setValue("area", "");
                }}
                placeholder="Select division"
                isInvalid={!!errors.division}
                className="w-full"
              >
                <Label>Division</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {locationData.map((division) => (
                      <ListBox.Item
                        key={division.name}
                        id={division.name}
                        textValue={division.name}
                      >
                        {division.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>

                {errors.division && (
                  <FieldError>
                    {errors.division.message}
                  </FieldError>
                )}
              </Select>
            )}
          />

          {/* District */}
          <Controller
            name="district"
            control={control}
            render={({ field }) => (
              <Select
                selectedKey={field.value || null}
                onSelectionChange={(value: Key | null) => {
                  const district = value?.toString() ?? "";

                  field.onChange(district);

                  setSelectedDistrict(district);
                  setSelectedCity("");

                  setValue("city", "");
                  setValue("area", "");
                }}
                placeholder="Select district"
                isDisabled={!selectedDivision}
                isInvalid={!!errors.district}
                className="w-full"
              >
                <Label>District</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {getDistricts().map((district) => (
                      <ListBox.Item
                        key={district.name}
                        id={district.name}
                        textValue={district.name}
                      >
                        {district.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>

                {errors.district && (
                  <FieldError>
                    {errors.district.message}
                  </FieldError>
                )}
              </Select>
            )}
          />

          {/* City */}
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <Select
                selectedKey={field.value || null}
                onSelectionChange={(value: Key | null) => {
                  const city = value?.toString() ?? "";

                  field.onChange(city);

                  setSelectedCity(city);
                  setValue("area", "");
                }}
                placeholder="Select city"
                isDisabled={!selectedDistrict}
                isInvalid={!!errors.city}
                className="w-full"
              >
                <Label>City</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {getCities().map((city) => (
                      <ListBox.Item
                        key={city.name}
                        id={city.name}
                        textValue={city.name}
                      >
                        {city.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>

                {errors.city && (
                  <FieldError>
                    {errors.city.message}
                  </FieldError>
                )}
              </Select>
            )}
          />

          {/* Area */}
          <Controller
            name="area"
            control={control}
            render={({ field }) => (
              <Select
                selectedKey={field.value || null}
                onSelectionChange={(value: Key | null) => {
                  field.onChange(value?.toString() ?? "");
                }}
                placeholder="Select area"
                isDisabled={!selectedCity}
                isInvalid={!!errors.area}
                className="w-full"
              >
                <Label>Area</Label>

                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>

                <Select.Popover>
                  <ListBox>
                    {getAreas().map((area) => (
                      <ListBox.Item
                        key={area.name}
                        id={area.name}
                        textValue={area.name}
                      >
                        {area.name}
                        <ListBox.ItemIndicator />
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>

                {errors.area && (
                  <FieldError>
                    {errors.area.message}
                  </FieldError>
                )}
              </Select>
            )}
          />
        </div>

        {/* Full Address */}
        <TextField
          isInvalid={!!errors.address}
          className="mt-5 w-full"
        >
          <Label>Full Address</Label>

          <TextArea
            {...register("address")}
            rows={4}
            placeholder="Enter your complete address"
          />

          {errors.address && (
            <FieldError>
              {errors.address.message}
            </FieldError>
          )}
        </TextField>
      </section>

      {/* Contact */}
      <section>
        <div className="mb-5">
          <h3 className="text-lg font-semibold">
            Contact Information
          </h3>

          <p className="mt-1 text-sm text-default-500">
            Provide a phone number we can use for this booking.
          </p>
        </div>

        <TextField
          isInvalid={!!errors.phone}
          className="w-full"
        >
          <Label>Phone Number</Label>

          <Input
            type="tel"
            {...register("phone")}
            placeholder="Enter your phone number"
          />

          {errors.phone && (
            <FieldError>
              {errors.phone.message}
            </FieldError>
          )}
        </TextField>
      </section>

      {/* Price Summary */}
      <section className="rounded-2xl border border-default bg-default-50 p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-default-500">
              Rate
            </p>

            <p className="mt-1 font-semibold">
              ৳{rate.toLocaleString()} /{" "}
              {durationType === "day" ? "day" : "hour"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-default-500">
              Estimated Total
            </p>

            <p className="mt-1 text-2xl font-bold">
              ৳{totalCost.toLocaleString()}
            </p>
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end border-t border-default pt-6">
        <Button
          type="submit"
          variant="primary"
          size="lg"
        >
          Confirm Booking
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;