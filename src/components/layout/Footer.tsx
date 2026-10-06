import Link from "next/link";

const Footer = () => {
    return (
        <footer className="border-t border-default bg-default-50">
            <div className="mx-auto max-w-7xl px-6 py-12">
                <div className="grid gap-8 md:grid-cols-3">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="text-xl font-bold tracking-tight"
                        >
                            Care<span className="text-primary">.xyz</span>
                        </Link>

                        <p className="mt-3 max-w-sm text-sm leading-6 text-default-500">
                            Making quality care easier to access for families and loved
                            ones.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h3 className="font-semibold">Quick Links</h3>

                        <ul className="mt-4 space-y-3 text-sm">
                            <li>
                                <Link
                                    href="/"
                                    className="text-default-500 transition hover:text-foreground"
                                >
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/services"
                                    className="text-default-500 transition hover:text-foreground"
                                >
                                    Services
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/my-bookings"
                                    className="text-default-500 transition hover:text-foreground"
                                >
                                    My Bookings
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold">Contact</h3>

                        <ul className="mt-4 space-y-3 text-sm text-default-500">
                            <li>Email: support@care.xyz</li>
                            <li>Phone: +880 1XXX-XXXXXX</li>
                            <li>Available 24/7 for your care needs</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-default pt-6 text-center text-sm text-default-500">
                    © {new Date().getFullYear()} Care.xyz. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;