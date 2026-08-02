import {
    FaChartPie,
    FaHeart,
    FaClipboardList,
    FaUserCircle,
    FaHome,
    FaBuilding,
    FaUsers,
    FaMoneyCheckAlt,
} from "react-icons/fa";

export const tenantMenu = [
    {
        label: "My Bookings",
        href: "/dashboard/tenant/bookings",
        icon: FaClipboardList,
    },
    {
        label: "Favorites",
        href: "/dashboard/tenant/favorites",
        icon: FaHeart,
    },
    {
        label: "Profile",
        href: "/dashboard/tenant/profile",
        icon: FaUserCircle,
    },
];

export const ownerMenu = [
    {
        label: "Dashboard",
        href: "/dashboard/owner",
        icon: FaChartPie,
    },
    {
        label: "Add Property",
        href: "/dashboard/owner/add-property",
        icon: FaHome,
    },
    {
        label: "My Properties",
        href: "/dashboard/owner/properties",
        icon: FaBuilding,
    },
    {
        label: "Booking Requests",
        href: "/dashboard/owner/booking-requests",
        icon: FaClipboardList,
    },
    {
        label: "Profile",
        href: "/dashboard/owner/profile",
        icon: FaUserCircle,
    },
];

export const adminMenu = [
    {
        label: "All Users",
        href: "/dashboard/admin/users",
        icon: FaUsers,
    },
    {
        label: "All Properties",
        href: "/dashboard/admin/properties",
        icon: FaBuilding,
    },
    {
        label: "All Bookings",
        href: "/dashboard/admin/bookings",
        icon: FaClipboardList,
    },
    {
        label: "Transactions",
        href: "/dashboard/admin/transactions",
        icon: FaMoneyCheckAlt,
    },
    {
        label: "Profile",
        href: "/dashboard/admin/profile",
        icon: FaUserCircle,
    },
];