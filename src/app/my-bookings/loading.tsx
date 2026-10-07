export default function Loading() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-default-50">
            <div className="mx-auto max-w-5xl px-6 py-12">
                {/* Back link */}
                <div className="h-5 w-36 animate-pulse rounded bg-default-200" />

                {/* Page heading */}
                <div className="mt-6">
                    <div className="h-4 w-24 animate-pulse rounded bg-default-200" />

                    <div className="mt-3 h-12 w-full max-w-xl animate-pulse rounded-lg bg-default-200" />

                    <div className="mt-4 h-5 w-full max-w-2xl animate-pulse rounded bg-default-200" />
                </div>

                {/* Main content */}
                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
                    {/* Booking Form */}
                    <section className="rounded-2xl border border-default bg-background p-6 shadow-sm sm:p-8">
                        <div className="h-7 w-48 animate-pulse rounded bg-default-200" />

                        <div className="mt-2 h-4 w-72 animate-pulse rounded bg-default-200" />

                        <div className="mt-8 space-y-8">
                            {/* Duration */}
                            <div>
                                <div className="h-5 w-40 animate-pulse rounded bg-default-200" />
                                <div className="mt-2 h-4 w-64 animate-pulse rounded bg-default-200" />

                                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                    <div className="h-12 animate-pulse rounded-lg bg-default-100" />
                                    <div className="h-12 animate-pulse rounded-lg bg-default-100" />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <div className="h-5 w-32 animate-pulse rounded bg-default-200" />
                                <div className="mt-2 h-4 w-72 animate-pulse rounded bg-default-200" />

                                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="h-12 animate-pulse rounded-lg bg-default-100"
                                        />
                                    ))}
                                </div>

                                <div className="mt-5 h-28 animate-pulse rounded-lg bg-default-100" />
                            </div>

                            {/* Contact */}
                            <div>
                                <div className="h-5 w-44 animate-pulse rounded bg-default-200" />
                                <div className="mt-2 h-4 w-72 animate-pulse rounded bg-default-200" />

                                <div className="mt-5 h-12 animate-pulse rounded-lg bg-default-100" />
                            </div>

                            {/* Total */}
                            <div className="rounded-2xl border border-default bg-default-50 p-5">
                                <div className="flex items-center justify-between gap-4">
                                    <div>
                                        <div className="h-4 w-16 animate-pulse rounded bg-default-200" />
                                        <div className="mt-2 h-5 w-28 animate-pulse rounded bg-default-200" />
                                    </div>

                                    <div>
                                        <div className="ml-auto h-4 w-24 animate-pulse rounded bg-default-200" />
                                        <div className="mt-2 ml-auto h-8 w-28 animate-pulse rounded bg-default-200" />
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end border-t border-default pt-6">
                                <div className="h-12 w-40 animate-pulse rounded-lg bg-default-200" />
                            </div>
                        </div>
                    </section>

                    {/* Service Summary */}
                    <aside>
                        <div className="sticky top-24 rounded-2xl border border-default bg-background p-6 shadow-sm">
                            <div className="h-6 w-40 animate-pulse rounded bg-default-200" />

                            <div className="mt-2 h-4 w-32 animate-pulse rounded bg-default-200" />

                            <div className="my-6 border-t border-default" />

                            <div className="space-y-5">
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-24 animate-pulse rounded bg-default-200" />
                                    <div className="h-5 w-20 animate-pulse rounded bg-default-200" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-24 animate-pulse rounded bg-default-200" />
                                    <div className="h-5 w-20 animate-pulse rounded bg-default-200" />
                                </div>
                            </div>

                            <div className="my-6 border-t border-default" />

                            <div className="h-10 w-full animate-pulse rounded-lg bg-default-200" />
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}