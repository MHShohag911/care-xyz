"use client";

import Link from "next/link";
import { Button, Link as HeroLink } from "@heroui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import LogoutButton from "@/components/auth/LogoutButton";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, status } = useSession();

    const isLoggedIn = status === "authenticated";

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-default bg-background/80 backdrop-blur-md">
            <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-xl font-bold tracking-tight"
                >
                    Care<span className="text-primary">.xyz</span>
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden items-center gap-6 md:flex">
                    <li>
                        <HeroLink href="/">Home</HeroLink>
                    </li>

                    <li>
                        <HeroLink href="/services">Services</HeroLink>
                    </li>

                    <li>
                        <HeroLink href="/my-bookings">My Bookings</HeroLink>
                    </li>

                    <li>
                        {status === "loading" ? (
                            <div className="h-10 w-20 animate-pulse rounded-lg bg-default-100" />
                        ) : isLoggedIn ? (
                            <LogoutButton />
                        ) : (
                            <Link href="/login">
                                <Button variant="primary">
                                    Login
                                </Button>
                            </Link>
                        )}
                    </li>
                </ul>

                {/* Mobile Menu Button */}
                <Button
                    isIconOnly
                    variant="ghost"
                    className="md:hidden"
                    onPress={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation menu"
                >
                    {isOpen ? "✕" : "☰"}
                </Button>
            </header>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-default px-6 py-4 md:hidden">
                    <ul className="flex flex-col gap-4">
                        <li>
                            <HeroLink
                                href="/"
                                onClick={() => setIsOpen(false)}
                            >
                                Home
                            </HeroLink>
                        </li>

                        <li>
                            <HeroLink
                                href="/services"
                                onClick={() => setIsOpen(false)}
                            >
                                Services
                            </HeroLink>
                        </li>

                        <li>
                            <HeroLink
                                href="/my-bookings"
                                onClick={() => setIsOpen(false)}
                            >
                                My Bookings
                            </HeroLink>
                        </li>

                        <li>
                            {status === "loading" ? (
                                <div className="h-10 w-20 animate-pulse rounded-lg bg-default-100" />
                            ) : isLoggedIn ? (
                                <LogoutButton />
                            ) : (
                                <Link
                                    href="/login"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Button variant="primary">
                                        Login
                                    </Button>
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>
            )}
        </nav>
    );
}