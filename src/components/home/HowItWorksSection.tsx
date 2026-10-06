const steps = [
    {
        number: "01",
        title: "Choose a Service",
        description:
            "Select the type of care you need for your child, elderly family member, or loved one.",
    },
    {
        number: "02",
        title: "Make a Booking",
        description:
            "Choose your preferred duration and provide your location and contact information.",
    },
    {
        number: "03",
        title: "Get Quality Care",
        description:
            "Your booking is processed and you can manage its status from your account.",
    },
];
const HowItWorksSection = () => {
    return (
        <section className="bg-default-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-primary">
                        How It Works
                    </p>

                    <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                        Getting care is simple
                    </h2>

                    <p className="mt-4 text-default-500">
                        Book the care you need in just a few simple steps.
                    </p>
                </div>

                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    {steps.map((step) => (
                        <div key={step.number} className="text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                                {step.number}
                            </div>

                            <h3 className="mt-5 text-xl font-semibold">
                                {step.title}
                            </h3>

                            <p className="mt-3 leading-7 text-default-500">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorksSection;