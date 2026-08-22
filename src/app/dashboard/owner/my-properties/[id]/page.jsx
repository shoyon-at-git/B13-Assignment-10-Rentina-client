import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import DeletePropertyButton from "@/components/dashboard/owner/delete-property-button";

export default async function PropertyDetailsPage({ params }) {
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

    const { id } = await params;

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${serverUrl}/api/properties/${id}?ownerId=${session.user.id}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success || !data.property) {
        return (
            <div className="mx-auto max-w-3xl p-6">
                <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-2xl font-semibold">
                        Property not found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        This property does not exist or you do not
                        have permission to view it.
                    </p>

                    <Link
                        href="/dashboard/owner/my-properties"
                        className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        ← Back to My Properties
                    </Link>
                </div>
            </div>
        );
    }

    const property = data.property;

    return (
        <div className="mx-auto max-w-5xl space-y-6 py-8">
            {/* =========================
                Header
            ========================= */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Property Details
                    </h1>

                    <p className="mt-1 text-gray-500">
                        View and manage your property.
                    </p>
                </div>

                <Link
                    href="/dashboard/owner/my-properties"
                    className="w-fit rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    ← Back
                </Link>
            </div>

            {/* =========================
                Property Card
            ========================= */}

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                {/* Property Image */}

                <div className="relative h-[300px] w-full sm:h-[400px]">
                    <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                    />
                </div>

                {/* Content */}

                <div className="space-y-7 p-6">
                    {/* =========================
                        Title + Status
                    ========================= */}

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {property.title}
                            </h2>

                            <p className="mt-2 text-gray-500">
                                📍 {property.location},{" "}
                                {property.city}
                            </p>

                            <p className="mt-2 text-sm text-gray-500">
                                🏠 {property.propertyType}
                            </p>
                        </div>

                        <span
                            className={`w-fit rounded-full px-4 py-2 text-sm font-medium ${
                                property.status === "available"
                                    ? "bg-green-100 text-green-700"
                                    : property.status === "rented"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-gray-100 text-gray-700"
                            }`}
                        >
                            {property.status}
                        </span>
                    </div>

                    {/* =========================
                        Rent
                    ========================= */}

                    <div className="rounded-xl bg-green-50 p-5">
                        <p className="text-sm font-medium text-gray-500">
                            Monthly Rent
                        </p>

                        <p className="mt-1 text-3xl font-bold text-green-600">
                            ৳ {property.rent}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                            per month
                        </p>
                    </div>

                    {/* =========================
                        Property Information
                    ========================= */}

                    <div>
                        <h3 className="mb-4 text-xl font-semibold">
                            Property Information
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {/* Bedrooms */}

                            <div className="rounded-xl border p-5">
                                <p className="text-sm text-gray-500">
                                    🛏️ Bedrooms
                                </p>

                                <p className="mt-1 text-2xl font-semibold">
                                    {property.bedrooms}
                                </p>
                            </div>

                            {/* Bathrooms */}

                            <div className="rounded-xl border p-5">
                                <p className="text-sm text-gray-500">
                                    🚿 Bathrooms
                                </p>

                                <p className="mt-1 text-2xl font-semibold">
                                    {property.bathrooms}
                                </p>
                            </div>

                            {/* Area */}

                            <div className="rounded-xl border p-5">
                                <p className="text-sm text-gray-500">
                                    📐 Area
                                </p>

                                <p className="mt-1 text-2xl font-semibold">
                                    {property.area}
                                </p>

                                <p className="text-sm text-gray-500">
                                    sqft
                                </p>
                            </div>

                            {/* Property Type */}

                            <div className="rounded-xl border p-5">
                                <p className="text-sm text-gray-500">
                                    🏠 Property Type
                                </p>

                                <p className="mt-1 text-lg font-semibold">
                                    {property.propertyType}
                                </p>
                            </div>

                            {/* City */}

                            <div className="rounded-xl border p-5">
                                <p className="text-sm text-gray-500">
                                    🌆 City
                                </p>

                                <p className="mt-1 text-lg font-semibold">
                                    {property.city}
                                </p>
                            </div>

                            {/* Location */}

                            <div className="rounded-xl border p-5">
                                <p className="text-sm text-gray-500">
                                    📍 Location
                                </p>

                                <p className="mt-1 text-lg font-semibold">
                                    {property.location}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* =========================
                        Owner Information
                    ========================= */}

                    <div>
                        <h3 className="mb-4 text-xl font-semibold">
                            Owner Information
                        </h3>

                        <div className="rounded-xl border bg-gray-50 p-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Owner Name */}

                                <div>
                                    <p className="text-sm text-gray-500">
                                        👤 Owner Name
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {property.ownerName ||
                                            "Not available"}
                                    </p>
                                </div>

                                {/* Owner Email */}

                                <div>
                                    <p className="text-sm text-gray-500">
                                        ✉️ Owner Email
                                    </p>

                                    <p className="mt-1 break-all font-semibold">
                                        {property.ownerEmail ||
                                            "Not available"}
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* =========================
                        Description
                    ========================= */}

                    <div>
                        <h3 className="text-xl font-semibold">
                            Description
                        </h3>

                        <div className="mt-3 rounded-xl border bg-gray-50 p-5">
                            <p className="leading-7 text-gray-600">
                                {property.description}
                            </p>
                        </div>
                    </div>

                    {/* =========================
                        Property Metadata
                    ========================= */}

                    <div>
                        <h3 className="mb-4 text-xl font-semibold">
                            Property Information
                        </h3>

                        <div className="rounded-xl border p-5">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {/* Property ID */}

                                

                                {/* Status */}

                                <div>
                                    <p className="text-sm text-gray-500">
                                        📌 Status
                                    </p>

                                    <p className="mt-1 font-semibold capitalize">
                                        {property.status}
                                    </p>
                                </div>

                                {/* Created At */}

                                <div>
                                    <p className="text-sm text-gray-500">
                                        📅 Created At
                                    </p>

                                    <p className="mt-1 font-medium">
                                        {new Date(
                                            property.createdAt
                                        ).toLocaleString("en-BD", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                </div>

                                {/* Updated At */}

                                {property.updatedAt && (
                                    <div>
                                        <p className="text-sm text-gray-500">
                                            🔄 Last Updated
                                        </p>

                                        <p className="mt-1 font-medium">
                                            {new Date(
                                                property.updatedAt
                                            ).toLocaleString(
                                                "en-BD",
                                                {
                                                    day: "2-digit",
                                                    month: "long",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                }
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* =========================
                        Actions
                    ========================= */}

                    <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row">
                        {/* Update */}

                        <Link
                            href={`/dashboard/owner/my-properties/${property._id}/edit`}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            ✏️ Update Property
                        </Link>

                        {/* Delete */}

                        <DeletePropertyButton
                            propertyId={property._id}
                            ownerId={session.user.id}
                        />

                        {/* Back */}

                        <Link
                            href="/dashboard/owner/my-properties"
                            className="rounded-lg border px-5 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Back to Properties
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}