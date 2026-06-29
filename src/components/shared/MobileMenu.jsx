"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { FaBars } from "react-icons/fa";
import { RiLogoutBoxLine } from "react-icons/ri";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function MobileMenu({ session }) {
    const router = useRouter();

    async function handleLogout() {
        try {
            await authClient.signOut();

            toast.success("Logged out successfully.");

            router.replace("/login");
            router.refresh();
        } catch (error) {
            console.error(error);
            toast.error("Logout failed.");
        }
    }

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                >
                    <FaBars className="text-xl" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left">
                <SheetHeader>
                    <SheetTitle>Rentina</SheetTitle>
                </SheetHeader>

                <div className="mt-8 flex flex-col gap-5">

                    <Link href="/">
                        Home
                    </Link>

                    <Link href="/apartments">
                        All Properties
                    </Link>

                    {!session ? (
                        <>
                            <Link href="/login">
                                Login
                            </Link>

                            <Link href="/register">
                                Register
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/dashboard">
                                Dashboard
                            </Link>

                            <Button
                                variant="ghost"
                                className="justify-start p-0 text-red-500 hover:text-red-600"
                                onClick={handleLogout}
                            >
                                <RiLogoutBoxLine className="mr-2" />
                                Logout
                            </Button>
                        </>
                    )}

                </div>
            </SheetContent>
        </Sheet>
    );
}