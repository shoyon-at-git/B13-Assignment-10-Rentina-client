import Image from "next/image";
import { headers } from "next/headers";
import BookingRequestActions from "@/components/dashboard/owner/booking-request-actions";
import { auth } from "@/lib/auth";

export default async function BookingRequestsPage() {
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

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${serverUrl}/api/bookings/owner/${session.user.id}`, {
        cache: "no-store",
    });

    const data = await response.json();

    const bookings = data.success ? data.bookings : [];

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Booking Requests</h1>

                <p className="mt-1 text-gray-500">Manage rental requests from tenants.</p>
            </div>

            {/* Empty State */}
            {bookings.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-xl font-semibold">No booking requests</h2>

                    <p className="mt-2 text-gray-500">You don't have any rental requests yet.</p>
                </div>
            ) : (
                <div className="space-y-5">
                    {bookings.map((booking) => (
                        <div key={booking._id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                            {/* Property */}
                            <div className="flex flex-col md:flex-row">
                                {booking.property?.image && (
                                    <div className="relative h-56 w-full md:h-auto md:w-64">
                                        <Image
                                            src={booking.property.image}
                                            alt={booking.property.title || "Property"}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                <div className="flex-1 space-y-5 p-5">
                                    {/* Property Information */}
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-sm text-gray-500">Property</p>

                                            <h2 className="text-xl font-bold">
                                                {booking.property?.title || "Property unavailable"}
                                            </h2>

                                            <p className="mt-1 text-sm text-gray-500">
                                                📍 {booking.property?.location}, {booking.property?.city}
                                            </p>

                                            <p className="mt-2 font-semibold text-green-600">
                                                ৳ {booking.property?.rent}
                                                /month
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
                                                booking.status === "pending"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : booking.status === "accepted"
                                                      ? "bg-green-100 text-green-700"
                                                      : "bg-red-100 text-red-700"
                                            }`}
                                        >
                                            {booking.status}
                                        </span>
                                    </div>

                                    {/* Tenant */}
                                    <div className="rounded-lg border bg-gray-50 p-4">
                                        <p className="text-sm font-medium text-gray-500">Tenant</p>

                                        <div className="mt-2 flex items-center gap-3">
                                            {booking.tenant?.image ? (
                                                <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                                    <Image
                                                        src={booking.tenant.image}
                                                        alt={booking.tenant.name || "Tenant"}
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
                                                    {booking.tenant?.name?.charAt(0)?.toUpperCase() || "T"}
                                                </div>
                                            )}

                                            <div>
                                                <p className="font-semibold">
                                                    {booking.tenant?.name || "Unknown Tenant"}
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {booking.tenant?.email || "Email unavailable"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Request Date */}
                                    <div className="text-sm text-gray-500">
                                        Requested on:{" "}
                                        <span className="font-medium text-gray-700">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Accept / Reject */}
                                    <BookingRequestActions
                                        bookingId={booking._id}
                                        ownerId={session.user.id}
                                        status={booking.status}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
