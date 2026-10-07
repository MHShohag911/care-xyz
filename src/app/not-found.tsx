import Link from "next/link";
import { Button } from "@heroui/react";

const NotFound = () => {
    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-default-50 px-6 py-16">
            <div className="w-full max-w-lg text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-5xl">
                    🔍
                </div>

                <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-primary">
                    Page Not Found
                </p>

                <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-6xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-semibold">
                    We couldn't find that page.
                </h2>

                <p className="mx-auto mt-4 max-w-md leading-7 text-default-500">
                    The page you're looking for may have been moved, removed, or the
                    address may be incorrect.
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Link href="/">
                        <Button variant="primary">
                            Back to Home
                        </Button>
                    </Link>

                    <Link href="/services">
                        <Button variant="outline">
                            Explore Services
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default NotFound;