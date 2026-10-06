
const loading = () => {
    return (
        <div>
            <div className="max-w-4xl mx-auto py-12">
                <h1 className="text-3xl font-bold">My Bookings</h1>

                <div className="mt-6 space-y-4">
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="h-4 animate-pulse rounded-xl bg-gray-200"></div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
};

export default loading;