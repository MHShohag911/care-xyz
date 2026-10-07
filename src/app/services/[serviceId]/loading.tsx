export default function Loading() {
  return (
    <main>
      {/* Header Skeleton */}
      <section className="border-b border-default bg-default-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="h-5 w-32 animate-pulse rounded bg-default-200" />

          <div className="mt-6 max-w-3xl">
            <div className="h-4 w-24 animate-pulse rounded bg-default-200" />

            <div className="mt-4 h-12 w-full max-w-xl animate-pulse rounded-lg bg-default-200" />

            <div className="mt-5 h-6 w-full max-w-2xl animate-pulse rounded-lg bg-default-200" />
            <div className="mt-3 h-6 w-5/6 max-w-2xl animate-pulse rounded-lg bg-default-200" />
          </div>
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_380px]">
          <div>
            {/* Service Image */}
            <div className="h-72 animate-pulse rounded-3xl bg-default-100" />

            {/* Features */}
            <div className="mt-10">
              <div className="h-8 w-48 animate-pulse rounded bg-default-200" />

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-16 animate-pulse rounded-xl border border-default bg-default-50"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Skeleton */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-default bg-background p-6 shadow-sm">
              <div className="h-7 w-40 animate-pulse rounded bg-default-200" />

              <div className="mt-6 space-y-5">
                <div className="flex justify-between">
                  <div className="h-5 w-20 animate-pulse rounded bg-default-200" />
                  <div className="h-5 w-20 animate-pulse rounded bg-default-200" />
                </div>

                <div className="flex justify-between">
                  <div className="h-5 w-20 animate-pulse rounded bg-default-200" />
                  <div className="h-5 w-20 animate-pulse rounded bg-default-200" />
                </div>
              </div>

              <div className="my-6 border-t border-default" />

              <div className="h-12 w-full animate-pulse rounded-lg bg-default-200" />
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}