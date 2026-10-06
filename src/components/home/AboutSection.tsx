
const AboutSection = () => {
    return (
        <section className="bg-default-50 py-20">
            <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
                {/* Visual */}
                <div className="flex justify-center">
                    <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-3xl bg-primary/10">
                        <div className="text-center">
                            <div className="text-6xl">🤝</div>

                            <p className="mt-4 text-xl font-semibold">
                                Care with confidence
                            </p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div>
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                        About Care.xyz
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Making quality care easier to access.
                    </h2>

                    <p className="mt-6 leading-7 text-default-500">
                        Finding reliable care for a child, an elderly family member, or
                        someone who needs special assistance can be challenging. Care.xyz
                        makes the process simpler by bringing different care services
                        together in one convenient platform.
                    </p>

                    <p className="mt-4 leading-7 text-default-500">
                        Choose the service you need, provide your care requirements,
                        select your location and duration, and manage your bookings from
                        one place.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;