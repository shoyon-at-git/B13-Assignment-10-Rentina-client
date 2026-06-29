"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { FaUserCircle } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";

import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

export default function UserMenu({ session }) {
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
        <DropdownMenu>
            <DropdownMenuTrigger className="outline-none cursor-pointer">
                <Avatar className="h-10 w-10 border">
                    <AvatarImage src={session?.user?.image} />

                    <AvatarFallback>
                        {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-56">

                <DropdownMenuLabel>
                    <p className="font-semibold">
                        {session?.user?.name}
                    </p>

                    <p className="text-xs text-muted-foreground">
                        {session?.user?.email}
                    </p>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <Link
                        href="/dashboard"
                        className="cursor-pointer flex items-center gap-2"
                    >
                        <MdDashboard />
                        Dashboard
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                    onClick={handleLogout}
                    className="cursor-pointer text-red-500 focus:text-red-500"
                >
                    <RiLogoutBoxLine className="mr-2" />
                    Logout
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
}