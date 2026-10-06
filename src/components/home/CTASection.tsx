import Link from "next/link";
import { Button } from "@heroui/react";

const CTASection = () => {
    return (
        <section className="py-20">
            <div className="mx-auto max-w-5xl px-6">
                <div className="rounded-3xl bg-primary px-6 py-16 text-center text-primary-foreground sm:px-12">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Need reliable care for your loved ones?
                    </h2>

                    <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
                        Explore our care services and find the right option for your
                        family's needs.
                    </p>

                    <div className="mt-8">
                        <Link href="/services">
                            <Button variant="secondary" size="lg">
                                Explore Services
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;