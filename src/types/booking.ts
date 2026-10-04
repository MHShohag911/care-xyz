export type BookingStatus =
    | "pending"
    | "confirmed"
    | "completed"
    | "cancelled";


export type DurationType = "hour" | "day";

export interface BookingDuration {
  type: DurationType;
  value: number;
}

export interface BookingLocation {
  division: string;
  district: string;
  city: string;
  area: string;
  address: string;
}

export interface Booking {
  _id?: string;
  userId: string;
  serviceId: string;
  serviceName: string;
  duration: BookingDuration;
  location: BookingLocation;
  phone: string;
  totalCost: number;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}