import { auth } from '@/lib/auth';
import { getBookingsByUserId } from '@/models/booking';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
    const session = await auth()

    if (!session?.user?.email) {
        redirect("/login");
    }

    const bookings = await getBookingsByUserId(session.user.email);

    return (
        <div>
            <div className='max-w-4xl mx-auto py-12'>
                <h1 className="text-3xl font-bold">My Bookings</h1>

                {
                    bookings.length === 0 ? (
                        <p className="mt-6 text-gray-600">Your don't have any bookings yet.</p>
                    ) : (
                        <div className="mt-6">
                            {bookings.map((booking) => (
                                <div
                                    key={booking._id}
                                    className="rounded-xl border p-6 w-full my-5"
                                >
                                    <h2 className="text-xl font-semibold">
                                        {booking.serviceName}
                                    </h2>

                                    <p className="mt-2">
                                        Duration: {booking.duration.value}{" "}
                                        {booking.duration.type === "hour" ? "hour(s)" : "day(s)"}
                                    </p>

                                    <p>Total: ৳{booking.totalCost}</p>

                                    <p>Status: {booking.status}</p>

                                    <Link
                                        href={`/my-bookings/${booking._id}`}
                                        className="mt-4 inline-block rounded-lg bg-black px-4 py-2 text-white"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )

                }

            </div>
        </div>
    );
};

export default page;