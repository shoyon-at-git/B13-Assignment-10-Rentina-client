"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarItem({
    href,
    icon: Icon,
    label,
}) {

    const pathname = usePathname();

    const isActive =
        pathname === href ||
        pathname.startsWith(`${href}/`);

    return (
        <Link
            href={href}
            className={`flex border items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${
                isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-slate-100 hover:text-blue-600"
            }`}
        >

            <Icon className="text-lg" />

            <span className="font-medium">
                {label}
            </span>

        </Link>
    );
}