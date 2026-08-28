import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import AdminCharts from "@/components/dashboard/admin/admin-charts";

export default async function AdminDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">Unauthorized</h2>
            </div>
        );
    }

    if (session.user.role !== "admin") {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">Access Denied</h2>
            </div>
        );
    }

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${serverUrl}/api/admin/stats`, {
        cache: "no-store",
    });

    const data = await response.json();

    const stats = data.success
        ? data.stats
        : {
              totalUsers: 0,
              totalOwners: 0,
              totalTenants: 0,
              totalProperties: 0,
              totalBookings: 0,
          };

    return (
        <div>
            <div className="space-y-8 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>

                    <p className="mt-1 text-gray-500">Overview of your Rentina platform.</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                    {/* Users */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Total Users</p>

                        <h2 className="mt-2 text-3xl font-bold">{stats.totalUsers}</h2>
                    </div>

                    {/* Owners */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Total Owners</p>

                        <h2 className="mt-2 text-3xl font-bold">{stats.totalOwners}</h2>
                    </div>

                    {/* Tenants */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Total Tenants</p>

                        <h2 className="mt-2 text-3xl font-bold">{stats.totalTenants}</h2>
                    </div>

                    {/* Properties */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Total Properties</p>

                        <h2 className="mt-2 text-3xl font-bold">{stats.totalProperties}</h2>
                    </div>

                    {/* Bookings */}
                    <div className="rounded-xl border bg-white p-5 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">Total Bookings</p>

                        <h2 className="mt-2 text-3xl font-bold">{stats.totalBookings}</h2>
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-xl font-semibold">Quick Overview</h2>

                    <p className="mt-2 text-gray-500">Use the sidebar to manage users, properties and bookings.</p>
                </div>
            </div>
            <AdminCharts stats={stats}></AdminCharts>
        </div>
    );
}
