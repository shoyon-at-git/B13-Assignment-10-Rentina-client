"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { FaBars } from "react-icons/fa";

import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet";

import SidebarItem from "./SidebarItem";
import {
    adminMenu,
    ownerMenu,
    tenantMenu,
} from "./sidebar-menu";

export default function MobileSidebar() {
    const [open, setOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();

    if (isPending) return null;

    const role = session?.user?.role;

    let menu = [];

    if (role === "tenant") menu = tenantMenu;
    if (role === "owner") menu = ownerMenu;
    if (role === "admin") menu = adminMenu;

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <button className="lg:hidden">
                    <FaBars className="text-xl" />
                </button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-0">

                <div className="border-b p-5">
                    <h2 className="text-xl font-bold">
                        Dashboard
                    </h2>
                </div>

                <div className="space-y-2 p-4">

                    {menu.map((item) => (
                        <div
                            key={item.href}
                            onClick={() => setOpen(false)}
                        >
                            <SidebarItem
                                href={item.href}
                                icon={item.icon}
                                label={item.label}
                            />
                        </div>
                    ))}

                </div>

            </SheetContent>
        </Sheet>
    );
}