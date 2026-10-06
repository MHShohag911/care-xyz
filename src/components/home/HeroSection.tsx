import React from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="bg-background">
            <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2">
                {/* Hero Content */}
                <div className="max-w-3xl">
                    <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">
                        Trusted Care Services
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                        Quality care for the people who matter most.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-default-500">
                        Care.xyz connects you with trusted caregivers for children,
                        elderly family members, and people who need special care.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-4">
                        <Link
                            href="/services">
                            <Button
                                variant="primary"
                                size="lg"
                            >
                                Explore Services
                            </Button>
                        </Link>

                        <Link
                            href="/my-bookings">
                            <Button
                                variant="outline"
                                size="lg"
                            >
                                My Bookings
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Hero Visual */}
                <div className="flex justify-center lg:justify-end">
                    <div className="flex aspect-square w-full max-w-md items-center justify-center rounded-3xl bg-primary/10 p-8">
                        <div className="flex h-full w-full items-center justify-center rounded-2xl border border-primary/20 bg-background shadow-lg">
                            <div className="text-center">
                                <div className="text-6xl">❤️</div>

                                <p className="mt-4 text-xl font-semibold">
                                    Care you can trust
                                </p>

                                <p className="mt-2 text-sm text-default-500">
                                    For every stage of life
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;


