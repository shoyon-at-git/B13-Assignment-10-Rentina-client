"use client";

import { authClient } from "@/lib/auth-client";
import UserDropdown from "./UserDropdown";
import { FaBars } from "react-icons/fa";
import Logo from "../shared/Logo";

export default function DashboardNavbar() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <header className="h-16 border-b bg-white" />
        );
    }

    return (
        <header className="sticky top-0 z-50 h-16 border-b bg-white">
            <div className="flex h-full items-center justify-between px-6">

                {/* Left */}
                <div className="flex items-center gap-4">

                    {/* Mobile Sidebar Button */}
                    <button className="lg:hidden">
                        <FaBars className="text-xl" />
                    </button>

                    <Logo />

                    <h1 className="hidden text-xl font-semibold md:block">
                        Dashboard
                    </h1>

                </div>

                {/* Right */}
                <UserDropdown user={session?.user} />

            </div>
        </header>
    );
}