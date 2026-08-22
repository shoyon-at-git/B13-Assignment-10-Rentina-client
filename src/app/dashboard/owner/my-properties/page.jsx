import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import DeletePropertyButton from "@/components/dashboard/owner/delete-property-button";

export default async function MyPropertiesPage() {
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
        `${serverUrl}/api/properties/my?ownerId=${session.user.id}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    const properties = data.success ? data.properties : [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    My Properties
                </h1>

                <p className="text-gray-500">
                    Total Properties: {properties.length}
                </p>
            </div>

            {properties.length === 0 ? (
                <div className="rounded-lg border p-10 text-center">
                    <h2 className="text-xl font-semibold">
                        No properties found.
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Add your first property.
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {properties.map((property) => (
                        <div
                            key={property._id}
                            className="overflow-hidden rounded-xl border bg-white shadow-sm"
                        >
                            {/* Image */}
                            <div className="relative h-56 w-full">
                                <Image
                                    src={property.image}
                                    alt={property.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-2 p-4">
                                <h2 className="text-xl font-semibold">
                                    {property.title}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {property.location}, {property.city}
                                </p>

                                <p className="font-semibold text-green-600">
                                    ৳ {property.rent}/month
                                </p>

                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>
                                        {property.bedrooms} Beds
                                    </span>

                                    <span>
                                        {property.bathrooms} Baths
                                    </span>

                                    <span>
                                        {property.area} sqft
                                    </span>
                                </div>

                                <span className="inline-block rounded bg-green-100 px-3 py-1 text-sm text-green-700">
                                    {property.status}
                                </span>

                                {/* Buttons */}
                                <div className="mt-4 flex gap-2">
                                    <Link
                                        href={`/dashboard/owner/my-properties/${property._id}`}
                                        className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                                    >
                                        View Details
                                    </Link>

                                    <DeletePropertyButton
                                        propertyId={property._id}
                                        ownerId={session.user.id}
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