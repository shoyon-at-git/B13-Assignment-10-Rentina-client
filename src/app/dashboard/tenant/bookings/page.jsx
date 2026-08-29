import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import CancelBookingButton from "@/components/dashboard/tenant/CancelBookingButton";
import { auth } from "@/lib/auth";

export default async function TenantBookingsPage() {
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

    const response = await fetch(`${serverUrl}/api/bookings/tenant/${session.user.id}`, {
        cache: "no-store",
    });

    const data = await response.json();

    const bookings = data.success ? data.bookings : [];

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">My Bookings</h1>

                <p className="mt-1 text-gray-500">View and track your rental requests.</p>
            </div>

            {/* Empty State */}
            {bookings.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-xl font-semibold">No bookings found.</h2>

                    <p className="mt-2 text-gray-500">You have not requested any property yet.</p>

                    <Link
                        href="/dashboard/properties"
                        className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Browse Properties
                    </Link>
                </div>
            ) : (
                /* Booking Cards */
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {bookings.map((booking) => {
                        const property = booking.property;
                        const owner = booking.owner;

                        return (
                            <div key={booking._id} className="overflow-hidden rounded-xl border bg-white shadow-sm">
                                {/* Property Image */}
                                {property?.image && (
                                    <div className="relative h-52 w-full">
                                        <Image
                                            src={property.image}
                                            alt={property.title || "Property"}
                                            fill
                                            unoptimized
                                            className="object-cover"
                                        />
                                    </div>
                                )}

                                {/* Content */}
                                <div className="space-y-4 p-5">
                                    {/* Property */}
                                    <div>
                                        <h2 className="text-xl font-bold">
                                            {property?.title || "Property unavailable"}
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            📍 {property?.location}, {property?.city}
                                        </p>
                                    </div>

                                    {/* Rent */}
                                    <div>
                                        <p className="text-sm text-gray-500">Monthly Rent</p>

                                        <p className="text-xl font-bold text-green-600">৳ {property?.rent || "N/A"}</p>
                                    </div>

                                    {/* Owner */}
                                    <div className="rounded-lg bg-gray-50 p-3">
                                        <p className="text-sm text-gray-500">Property Owner</p>

                                        <p className="mt-1 font-semibold">{owner?.name || "Unknown"}</p>

                                        <p className="text-sm text-gray-500">{owner?.email || "No email"}</p>
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <p className="mb-1 text-sm text-gray-500">Booking Status</p>

                                        <span
                                            className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${
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

                                    {booking.status === "pending" && (
                                        <CancelBookingButton bookingId={booking._id} tenantId={session.user.id} />
                                    )}

                                    {/* Date */}
                                    <div className="text-sm text-gray-500">
                                        Requested on:{" "}
                                        <span className="font-medium text-gray-700">
                                            {new Date(booking.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Property Details */}
                                    {property?._id && (
                                        <Link
                                            href={`/dashboard/properties/${property._id}`}
                                            className="block w-full rounded-lg border px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                        >
                                            View Property
                                        </Link>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
