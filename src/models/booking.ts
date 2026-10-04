import { getDatabase } from "@/lib/mongodb";
import { Booking } from "@/types/booking";
import { ObjectId } from "mongodb";

type BookingDocument = Omit<Booking, "_id"> & {
    _id: ObjectId;
}

const COLLECTION_NAME = "bookings";

export async function createBooking(
    booking: Omit<Booking, "_id">
): Promise<string>{
    const db = await getDatabase();

    const result = await db.collection<BookingDocument>(COLLECTION_NAME).insertOne({
        ...booking,
        _id: new ObjectId(),
    });

    return result.insertedId.toString();
}