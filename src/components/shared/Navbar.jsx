"use client";

import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import Logo from "./Logo";
import NavLinks from "./NavLinks";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

import { Button } from "@/components/ui/button";

export default function Navbar() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <nav className="border-b">
                <div className="container mx-auto h-16 flex items-center justify-between px-4">
                    <Logo />
                </div>
            </nav>
        );
    }

    return (
        <nav className="border-b bg-white sticky top-0 z-50">
            <div className="container mx-auto h-16 flex items-center justify-between px-4">

                {/* Logo */}
                <Logo />

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <NavLinks />
                </div>

                {/* Right Side */}
                <div className="hidden md:flex items-center gap-3">

                    {!session ? (
                        <>
                            <Button asChild variant="ghost">
                                <Link href="/login">
                                    Login
                                </Link>
                            </Button>

                            <Button asChild>
                                <Link href="/register">
                                    Register
                                </Link>
                            </Button>
                        </>
                    ) : (
                        <UserMenu session={session} />
                    )}

                </div>

                {/* Mobile Menu */}

                <MobileMenu session={session} />

            </div>
        </nav>
    );
}