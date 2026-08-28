"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

export default function TenantChart({ stats }) {
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

    return (
        <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">
                Booking Status
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                Overview of your rental requests.
            </p>

            <div className="mt-4 h-[320px]">
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    <BarChart data={bookingData}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis allowDecimals={false} />

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
    );
}