"use client";

import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
    FaHome,
    FaSignOutAlt,
    FaUserCircle,
} from "react-icons/fa";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";

export default function UserDropdown({ user }) {
    const router = useRouter();
    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/");
    };

    return (
        <DropdownMenu>

            <DropdownMenuTrigger className="outline-none">

                <div className="flex items-center gap-3 cursor-pointer">

                    <Avatar>

                        <AvatarImage src={user?.image} />

                        <AvatarFallback>
                            {user?.name?.charAt(0)}
                        </AvatarFallback>

                    </Avatar>

                    <div className="hidden text-left md:block">

                        <h4 className="font-medium">
                            Hi, {user?.name}
                        </h4>

                        <p className="text-sm text-gray-500">
                            {user?.email}
                        </p>

                    </div>

                </div>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem asChild>

                    <Link href="/dashboard/profile">

                        <FaUserCircle />

                        Profile

                    </Link>

                </DropdownMenuItem>

                <DropdownMenuItem asChild>

                    <Link href="/">

                        <FaHome />

                        Home

                    </Link>

                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout}>

                    <FaSignOutAlt />

                    Logout

                </DropdownMenuItem>

            </DropdownMenuContent>

        </DropdownMenu>
    );
}