import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import OwnerCharts from "@/components/dashboard/owner/owner-charts";

export default async function OwnerDashboardPage() {
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

    if (session.user.role !== "owner") {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Access Denied
                </h2>

                <p className="mt-2 text-gray-500">
                    Only property owners can access this page.
                </p>
            </div>
        );
    }

    const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${serverUrl}/api/owner/stats/${session.user.id}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    const stats = data.success
        ? data.stats
        : {
              totalProperties: 0,
              availableProperties: 0,
              rentedProperties: 0,
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
                    Owner Dashboard
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage your properties and rental requests.
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {/* Total Properties */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Total Properties
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {stats.totalProperties}
                    </h2>
                </div>

                {/* Available */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Available
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-green-600">
                        {stats.availableProperties}
                    </h2>
                </div>

                {/* Rented */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Rented
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-orange-600">
                        {stats.rentedProperties}
                    </h2>
                </div>

                {/* Total Bookings */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Total Requests
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-blue-600">
                        {stats.totalBookings}
                    </h2>
                </div>

                {/* Pending */}
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-gray-500">
                        Pending Requests
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-yellow-600">
                        {stats.pendingBookings}
                    </h2>
                </div>
            </div>
            <OwnerCharts stats={stats} />
        </div>
    );
}