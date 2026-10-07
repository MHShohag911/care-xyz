export default function Loading() {
    return (
        <main className="mx-auto max-w-7xl px-6 py-12">
            <div className="max-w-2xl">
                <div className="h-4 w-28 animate-pulse rounded bg-default-200" />

                <div className="mt-4 h-12 w-full max-w-xl animate-pulse rounded-lg bg-default-200" />

                <div className="mt-4 h-6 w-full max-w-2xl animate-pulse rounded-lg bg-default-200" />
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="overflow-hidden rounded-2xl border border-default bg-background shadow-sm"
                    >
                        <div className="h-48 animate-pulse bg-default-100" />

                        <div className="space-y-4 p-6">
                            <div className="h-6 w-2/3 animate-pulse rounded bg-default-200" />

                            <div className="h-4 w-full animate-pulse rounded bg-default-200" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-default-200" />
                            <div className="h-4 w-4/6 animate-pulse rounded bg-default-200" />

                            <div className="flex items-center justify-between pt-2">
                                <div className="h-8 w-24 animate-pulse rounded bg-default-200" />
                                <div className="h-10 w-32 animate-pulse rounded-lg bg-default-200" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}