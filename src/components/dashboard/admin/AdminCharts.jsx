"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

export default function AdminCharts({ stats }) {
    const userData = [
        {
            name: "Owners",
            value: stats.totalOwners,
        },
        {
            name: "Tenants",
            value: stats.totalTenants,
        },
        {
            name: "Admins",
            value: stats.totalAdmins,
        },
    ];

    const propertyData = [
        {
            name: "Available",
            count: stats.availableProperties,
        },
        {
            name: "Rented",
            count: stats.rentedProperties,
        },
    ];

    const bookingData = [
        {
            name: "Pending",
            count: stats.pendingBookings,
        },
        {
            name: "Accepted",
            count: stats.acceptedBookings,
        },
        {
            name: "Rejected",
            count: stats.rejectedBookings,
        },
        {
            name: "Cancelled",
            count: stats.cancelledBookings,
        },
    ];

    const userColors = [
        "#3b82f6",
        "#22c55e",
        "#a855f7",
    ];

    return (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Users by Role */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold">
                    Users by Role
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Distribution of registered users.
                </p>

                <div className="h-[320px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <PieChart>
                            <Pie
                                data={userData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {userData.map(
                                    (entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={
                                                userColors[index]
                                            }
                                        />
                                    )
                                )}
                            </Pie>

                            <Tooltip />

                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Properties Status */}
            <div className="rounded-xl border bg-white p-5 shadow-sm">
                <h2 className="text-lg font-semibold">
                    Properties Status
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Current property availability.
                </p>

                <div className="h-[320px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart data={propertyData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis dataKey="name" />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                name="Properties"
                                radius={[6, 6, 0, 0]}
                            >
                                <Cell fill="#22c55e" />
                                <Cell fill="#f97316" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bookings Status */}
            <div className="rounded-xl border bg-white p-5 shadow-sm lg:col-span-2">
                <h2 className="text-lg font-semibold">
                    Bookings Status
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Overview of rental booking requests.
                </p>

                <div className="h-[320px]">
                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >
                        <BarChart data={bookingData}>
                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis dataKey="name" />

                            <YAxis
                                allowDecimals={false}
                            />

                            <Tooltip />

                            <Bar
                                dataKey="count"
                                name="Bookings"
                                radius={[6, 6, 0, 0]}
                            >
                                <Cell fill="#eab308" />
                                <Cell fill="#22c55e" />
                                <Cell fill="#ef4444" />
                                <Cell fill="#6b7280" />
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}