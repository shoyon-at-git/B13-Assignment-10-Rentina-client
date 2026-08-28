import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import RequestRentButton from "@/components/dashboard/tenant/request-rent-button";

export default async function PropertyDetailsPage({ params }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    const { id } = await params;

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${serverUrl}/api/properties/${id}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success || !data.property) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Property not found
                </h2>

                <p className="mt-2 text-gray-500">
                    This property does not exist or is no longer available.
                </p>

                <Link
                    href="/dashboard/properties"
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Back to Properties
                </Link>
            </div>
        );
    }

    const property = data.property;

    // =========================
    // Google Maps Embed URL
    // =========================

    function getGoogleMapEmbedUrl(url) {
        if (!url) return null;

        try {
            const decodedUrl = decodeURIComponent(url);

            // Try to find latitude and longitude
            const match = decodedUrl.match(
                /@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/
            );

            if (match) {
                const lat = match[1];
                const lng = match[2];

                return `https://www.google.com/maps?q=${lat},${lng}&output=embed`;
            }

            // Fallback
            return `https://www.google.com/maps?q=${encodeURIComponent(
                decodedUrl
            )}&output=embed`;
        } catch {
            return null;
        }
    }

    const mapEmbedUrl = getGoogleMapEmbedUrl(
        property.mapUrl
    );

    return (
        <div className="mx-auto max-w-5xl space-y-6 py-8">

            {/* =========================
                Header
            ========================= */}

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">
                        Property Details
                    </h1>

                    <p className="mt-1 text-gray-500">
                        View property information.
                    </p>
                </div>

                <Link
                    href="/dashboard/properties"
                    className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    ← Back
                </Link>
            </div>

            {/* =========================
                Property Card
            ========================= */}

            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

                {/* =========================
                    Image
                ========================= */}

                <div className="relative h-[400px] w-full">
                    <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        priority
                        unoptimized
                        className="object-cover"
                    />
                </div>

                {/* =========================
                    Content
                ========================= */}

                <div className="space-y-6 p-6">

                    {/* =========================
                        Title + Status
                    ========================= */}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {property.title}
                            </h2>

                            <p className="mt-2 text-gray-500">
                                📍 {property.location},{" "}
                                {property.city}
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            {property.status}
                        </span>
                    </div>

                    {/* =========================
                        Rent
                    ========================= */}

                    <div className="rounded-lg bg-green-50 p-5">
                        <p className="text-sm text-gray-500">
                            Monthly Rent
                        </p>

                        <p className="mt-1 text-3xl font-bold text-green-600">
                            ৳ {property.rent}
                        </p>
                    </div>

                    {/* =========================
                        Property Information
                    ========================= */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                        <div className="rounded-lg border p-4">
                            <p className="text-sm text-gray-500">
                                Bedrooms
                            </p>

                            <p className="mt-1 text-xl font-semibold">
                                {property.bedrooms}
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-sm text-gray-500">
                                Bathrooms
                            </p>

                            <p className="mt-1 text-xl font-semibold">
                                {property.bathrooms}
                            </p>
                        </div>

                        <div className="rounded-lg border p-4">
                            <p className="text-sm text-gray-500">
                                Area
                            </p>

                            <p className="mt-1 text-xl font-semibold">
                                {property.area} sqft
                            </p>
                        </div>

                    </div>

                    {/* =========================
                        Description
                    ========================= */}

                    <div>
                        <h3 className="text-xl font-semibold">
                            Description
                        </h3>

                        <p className="mt-2 leading-7 text-gray-600">
                            {property.description}
                        </p>
                    </div>

                    {/* =========================
                        Owner
                    ========================= */}

                    <div>
                        <h3 className="text-xl font-semibold">
                            Owned by
                        </h3>

                        <p className="mt-2 leading-7 text-gray-600">
                            {property.ownerName}
                            <br />
                            {property.ownerEmail}
                        </p>
                    </div>

                    {/* =========================
                        Google Maps
                    ========================= */}

                    {property.mapUrl && (
                        <div>

                            <h3 className="text-xl font-semibold">
                                📍 Property Location
                            </h3>

                            {mapEmbedUrl ? (
                                <div className="mt-3 overflow-hidden rounded-xl border">

                                    <iframe
                                        src={mapEmbedUrl}
                                        width="100%"
                                        height="350"
                                        style={{
                                            border: 0,
                                        }}
                                        loading="lazy"
                                        allowFullScreen
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title={`Map for ${property.title}`}
                                    />

                                </div>
                            ) : (
                                <div className="mt-3 rounded-xl border bg-gray-50 p-5 text-center text-gray-500">
                                    Unable to load map.
                                </div>
                            )}

                            {/* Open Google Maps */}

                            <a
                                href={property.mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
                            >
                                🗺️ Open in Google Maps →
                            </a>

                        </div>
                    )}

                    {/* =========================
                        Actions
                    ========================= */}

                    <div className="flex gap-3 border-t pt-6">

                        {session?.user?.role === "tenant" &&
                            property.status === "available" && (

                                <RequestRentButton
                                    propertyId={property._id}
                                    tenantId={session.user.id}
                                    ownerId={property.ownerId}
                                />

                            )}

                        <Link
                            href="/dashboard/properties"
                            className="rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            ← Back to Properties
                        </Link>

                    </div>

                </div>
            </div>
        </div>
    );
}