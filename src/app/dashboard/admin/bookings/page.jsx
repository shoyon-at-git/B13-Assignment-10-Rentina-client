import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function AdminBookingsPage() {
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

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${serverUrl}/api/bookings`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    const bookings = data.success ? data.bookings : [];

    const pendingCount = bookings.filter(
        (booking) => booking.status === "pending"
    ).length;

    const acceptedCount = bookings.filter(
        (booking) => booking.status === "accepted"
    ).length;

    const rejectedCount = bookings.filter(
        (booking) => booking.status === "rejected"
    ).length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    All Bookings
                </h1>

                <p className="mt-1 text-gray-500">
                    Monitor all rental requests across the platform.
                </p>
            </div>

            {/* Statistics */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-white p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                        Total Bookings
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {bookings.length}
                    </p>
                </div>

                <div className="rounded-xl border bg-yellow-50 p-5">
                    <p className="text-sm text-yellow-700">
                        Pending
                    </p>

                    <p className="mt-2 text-3xl font-bold text-yellow-700">
                        {pendingCount}
                    </p>
                </div>

                <div className="rounded-xl border bg-green-50 p-5">
                    <p className="text-sm text-green-700">
                        Accepted
                    </p>

                    <p className="mt-2 text-3xl font-bold text-green-700">
                        {acceptedCount}
                    </p>
                </div>

                <div className="rounded-xl border bg-red-50 p-5">
                    <p className="text-sm text-red-700">
                        Rejected
                    </p>

                    <p className="mt-2 text-3xl font-bold text-red-700">
                        {rejectedCount}
                    </p>
                </div>
            </div>

            {/* Bookings */}
            {bookings.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center">
                    <h2 className="text-xl font-semibold">
                        No bookings found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        There are no rental requests yet.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {bookings.map((booking) => (
                        <div
                            key={booking._id}
                            className="overflow-hidden rounded-xl border bg-white shadow-sm"
                        >
                            {/* Property Image */}
                            {booking.property?.image && (
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={booking.property.image}
                                        alt={
                                            booking.property.title ||
                                            "Property"
                                        }
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                            )}

                            <div className="space-y-4 p-5">
                                {/* Property */}
                                <div>
                                    <h2 className="text-xl font-semibold">
                                        {booking.property?.title ||
                                            "Property unavailable"}
                                    </h2>

                                    {booking.property && (
                                        <p className="mt-1 text-sm text-gray-500">
                                            📍{" "}
                                            {
                                                booking.property.location
                                            }
                                            ,{" "}
                                            {
                                                booking.property.city
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Rent */}
                                {booking.property && (
                                    <p className="font-semibold text-green-600">
                                        ৳{" "}
                                        {booking.property.rent}
                                        /month
                                    </p>
                                )}

                                {/* Tenant */}
                                <div className="rounded-lg bg-slate-50 p-3">
                                    <p className="text-xs text-gray-500">
                                        Tenant ID
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium">
                                        {booking.tenantId}
                                    </p>
                                </div>

                                {/* Owner */}
                                <div className="rounded-lg bg-slate-50 p-3">
                                    <p className="text-xs text-gray-500">
                                        Owner ID
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium">
                                        {booking.ownerId}
                                    </p>
                                </div>

                                {/* Status */}
                                <div>
                                    <span
                                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
                                            booking.status ===
                                            "accepted"
                                                ? "bg-green-100 text-green-700"
                                                : booking.status ===
                                                  "rejected"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}
                                    >
                                        {booking.status}
                                    </span>
                                </div>

                                {/* Date */}
                                <p className="text-sm text-gray-500">
                                    Requested:{" "}
                                    {new Date(
                                        booking.createdAt
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}