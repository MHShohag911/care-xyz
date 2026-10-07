export default function Loading() {
    return (
        <main className="min-h-[calc(100vh-4rem)] bg-default-50">
            <div className="mx-auto max-w-5xl px-6 py-12">
                {/* Back link */}
                <div className="h-5 w-36 animate-pulse rounded bg-default-200" />

                {/* Header */}
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div className="w-full max-w-2xl">
                        <div className="h-4 w-28 animate-pulse rounded bg-default-200" />

                        <div className="mt-4 h-12 w-full max-w-xl animate-pulse rounded-lg bg-default-200" />

                        <div className="mt-4 h-5 w-full max-w-lg animate-pulse rounded bg-default-200" />
                    </div>

                    <div className="h-8 w-24 animate-pulse rounded-full bg-default-200" />
                </div>

                {/* Content */}
                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_320px]">
                    {/* Booking Information */}
                    <section className="rounded-2xl border border-default bg-background shadow-sm">
                        <div className="border-b border-default px-6 py-5 sm:px-8">
                            <div className="h-6 w-48 animate-pulse rounded bg-default-200" />
                            <div className="mt-2 h-4 w-64 animate-pulse rounded bg-default-200" />
                        </div>

                        <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item}>
                                    <div className="h-4 w-24 animate-pulse rounded bg-default-200" />
                                    <div className="mt-2 h-5 w-40 animate-pulse rounded bg-default-200" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Summary */}
                    <aside>
                        <div className="sticky top-24 rounded-2xl border border-default bg-background p-6 shadow-sm">
                            <div className="h-6 w-40 animate-pulse rounded bg-default-200" />

                            <div className="mt-6 space-y-5">
                                <div className="flex justify-between gap-4">
                                    <div className="h-4 w-20 animate-pulse rounded bg-default-200" />
                                    <div className="h-5 w-24 animate-pulse rounded bg-default-200" />
                                </div>

                                <div className="flex justify-between gap-4">
                                    <div className="h-4 w-20 animate-pulse rounded bg-default-200" />
                                    <div className="h-5 w-20 animate-pulse rounded bg-default-200" />
                                </div>

                                <div className="border-t border-default" />

                                <div className="flex justify-between gap-4">
                                    <div className="h-5 w-24 animate-pulse rounded bg-default-200" />
                                    <div className="h-7 w-24 animate-pulse rounded bg-default-200" />
                                </div>
                            </div>

                            <div className="mt-6 border-t border-default pt-6">
                                <div className="h-10 w-full animate-pulse rounded-lg bg-default-200" />
                            </div>
                        </div>
                    </aside>

                    {/* Contact & Location */}
                    <section className="rounded-2xl border border-default bg-background shadow-sm lg:col-span-2">
                        <div className="border-b border-default px-6 py-5 sm:px-8">
                            <div className="h-6 w-56 animate-pulse rounded bg-default-200" />
                            <div className="mt-2 h-4 w-72 animate-pulse rounded bg-default-200" />
                        </div>

                        <div className="grid gap-6 px-6 py-6 sm:grid-cols-2 sm:px-8">
                            {[1, 2, 3, 4, 5, 6].map((item) => (
                                <div key={item}>
                                    <div className="h-4 w-24 animate-pulse rounded bg-default-200" />
                                    <div className="mt-2 h-5 w-40 animate-pulse rounded bg-default-200" />
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Bottom button */}
                <div className="mt-8">
                    <div className="h-10 w-40 animate-pulse rounded-lg bg-default-200" />
                </div>
            </div>
        </main>
    );
}