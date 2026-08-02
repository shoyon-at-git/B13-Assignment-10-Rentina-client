"use client";

import Logo from "@/components/shared/Logo";
import UserDropdown from "./UserDropdown";
import MobileSidebar from "./MobileSidebar";
import { authClient } from "@/lib/auth-client";

export default function DashboardNavbar() {
    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <header className="sticky top-0 z-50 h-16 border-b bg-white">
                <div className="flex h-full items-center justify-between px-4 md:px-6">
                    Loading...
                </div>
            </header>
        );
    }

    return (
        <header className="sticky top-0 z-50 h-16 border-b bg-white">
            <div className="flex h-full items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <MobileSidebar />
                    <Logo />
                    <h1 className="hidden text-xl font-semibold md:block">
                        Dashboard
                    </h1>
                </div>

                <UserDropdown user={session?.user} />
            </div>
        </header>
    );
}