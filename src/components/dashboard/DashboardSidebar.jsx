"use client";

import { authClient } from "@/lib/auth-client";

import SidebarItem from "./SidebarItem";

import {
    adminMenu,
    ownerMenu,
    tenantMenu,
} from "./sidebar-menu";

export default function DashboardSidebar() {

    const { data: session, isPending } = authClient.useSession();

    if (isPending) {
        return null;
    }

    const role = session?.user?.role;

    let menu = [];

    if (role === "tenant") {
        menu = tenantMenu;
    }

    if (role === "owner") {
        menu = ownerMenu;
    }

    if (role === "admin") {
        menu = adminMenu;
    }

    return (
        <aside className="hidden w-64 flex-shrink-0 border-r bg-white lg:block">

            <div className="sticky top-16 h-[calc(100vh-64px)] overflow-y-auto p-5">

                <div className="space-y-2">

                    {menu.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            icon={item.icon}
                            label={item.label}
                        />
                    ))}

                </div>

            </div>

        </aside>
    );
}