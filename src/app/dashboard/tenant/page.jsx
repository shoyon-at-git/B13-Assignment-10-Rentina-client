import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import TenantChart from "@/components/dashboard/tenant/TenantChart";

export default async function TenantDashboardPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Unauthorized
                </h2>
            </div>
        );
    }

    if (session.user.role !== "tenant") {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Access Denied
                </h2>

                <p className="mt-2 text-gray-500">
                    Only tenants can access this page.
                </p>
            </div>
        );
    }

    const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${serverUrl}/api/tenant/stats/${session.user.id}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    const stats = data.success
        ? data.stats
        : {
              totalBookings: 0,
              pendingBookings: 0,
              acceptedBookings: 0,
              rejectedBookings: 0,
              cancelledBookings: 0,
          };

    return (
        <div className="space-y-8 p-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    Tenant Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Track your rental requests and bookings.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">

                {/* Total */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Total Bookings
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-blue-600">
                        {stats.totalBookings}
                    </h2>
                </div>

                {/* Pending */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Pending
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                        {stats.pendingBookings}
                    </h2>
                </div>

                {/* Accepted */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Accepted
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                        {stats.acceptedBookings}
                    </h2>
                </div>

                {/* Rejected */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Rejected
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-red-600">
                        {stats.rejectedBookings}
                    </h2>
                </div>

                {/* Cancelled */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Cancelled
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-gray-600">
                        {stats.cancelledBookings}
                    </h2>
                </div>
            </div>
            <TenantChart stats={stats} />
        </div>
    );
}