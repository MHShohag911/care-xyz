import React from 'react';

const BookingDetailsPage = async ( params: Promise<{ bookingId: string }> ) => {
    const { bookingId } = await params;
    return (
        <div className="mx-auto max-w-4xl px-6 py-12">
            <h1 className="text-3xl font-bold">Booking Details</h1>

            <p className="mt-4">
                Booking ID: {bookingId}
            </p>
        </div>
    );
};

export default BookingDetailsPage;