import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

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
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Property not found
                </h2>

                <p className="mt-2 text-gray-500">
                    This property does not exist or you do not have
                    permission to view it.
                </p>

                <Link
                    href="/dashboard/owner/my-properties"
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Back to My Properties
                </Link>
            </div>
        );
    }

    const property = data.property;

    return (
        <div className="mx-auto max-w-5xl space-y-6 py-8">
            {/* Header */}
            <div className="flex items-center justify-between">
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
                    className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    ← Back
                </Link>
            </div>

            {/* Property Card */}
            <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                {/* Image */}
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

                {/* Content */}
                <div className="space-y-6 p-6">
                    {/* Title + Status */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-3xl font-bold">
                                {property.title}
                            </h2>

                            <p className="mt-2 text-gray-500">
                                📍 {property.location}, {property.city}
                            </p>
                        </div>

                        <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-700">
                            {property.status}
                        </span>
                    </div>

                    {/* Rent */}
                    <div className="rounded-lg bg-green-50 p-5">
                        <p className="text-sm text-gray-500">
                            Monthly Rent
                        </p>

                        <p className="mt-1 text-3xl font-bold text-green-600">
                            ৳ {property.rent}
                        </p>
                    </div>

                    {/* Property Information */}
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

                    {/* Description */}
                    <div>
                        <h3 className="text-xl font-semibold">
                            Description
                        </h3>

                        <p className="mt-2 leading-7 text-gray-600">
                            {property.description}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 border-t pt-6">
                        <Link
                            href={`/dashboard/owner/my-properties/${property._id}/edit`}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            ✏️ Update Property
                        </Link>

                        <Link
                            href="/dashboard/owner/my-properties"
                            className="rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                        >
                            Back to Properties
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}