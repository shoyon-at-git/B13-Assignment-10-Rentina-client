"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import PropertyFilters from "@/components/dashboard/admin/property-filters";
import PropertyActions from "@/components/dashboard/admin/property-actions";

export default function AdminPropertiesClient({
    properties,
}) {
    const [search, setSearch] = useState("");
    const [propertyType, setPropertyType] = useState("");
    const [status, setStatus] = useState("");
    const [sort, setSort] = useState("");

    const filteredProperties = useMemo(() => {
        let result = [...properties];

        // Search
        if (search.trim()) {
            const searchText = search
                .trim()
                .toLowerCase();

            result = result.filter((property) => {
                return (
                    property.title
                        ?.toLowerCase()
                        .includes(searchText) ||
                    property.location
                        ?.toLowerCase()
                        .includes(searchText) ||
                    property.city
                        ?.toLowerCase()
                        .includes(searchText)
                );
            });
        }

        // Property Type
        if (propertyType) {
            result = result.filter(
                (property) =>
                    property.propertyType ===
                    propertyType
            );
        }

        // Status
        if (status) {
            result = result.filter(
                (property) =>
                    property.status === status
            );
        }

        // Sort
        if (sort === "low-to-high") {
            result.sort(
                (a, b) =>
                    Number(a.rent) -
                    Number(b.rent)
            );
        }

        if (sort === "high-to-low") {
            result.sort(
                (a, b) =>
                    Number(b.rent) -
                    Number(a.rent)
            );
        }

        return result;
    }, [
        properties,
        search,
        propertyType,
        status,
        sort,
    ]);

    return (
        <div className="space-y-5">
            {/* Filters */}
            <PropertyFilters
                search={search}
                setSearch={setSearch}
                propertyType={propertyType}
                setPropertyType={setPropertyType}
                status={status}
                setStatus={setStatus}
                sort={sort}
                setSort={setSort}
            />

            {/* Result Count */}
            <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                    {filteredProperties.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                    {properties.length}
                </span>{" "}
                properties
            </div>

            {/* Empty Result */}
            {filteredProperties.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-xl font-semibold">
                        No properties found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Try changing your search or filters.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Property
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Owner
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Rent
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Type
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y">
                                {filteredProperties.map(
                                    (property) => (
                                        <tr
                                            key={
                                                property._id
                                            }
                                            className="hover:bg-gray-50"
                                        >
                                            {/* Property */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    {property.image ? (
                                                        <div className="relative h-12 w-16 overflow-hidden rounded-lg">
                                                            <Image
                                                                src={
                                                                    property.image
                                                                }
                                                                alt={
                                                                    property.title ||
                                                                    "Property"
                                                                }
                                                                fill
                                                                unoptimized
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="flex h-12 w-16 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-500">
                                                            No Image
                                                        </div>
                                                    )}

                                                    <div>
                                                        <p className="font-semibold">
                                                            {
                                                                property.title
                                                            }
                                                        </p>

                                                        <p className="text-sm text-gray-500">
                                                            {
                                                                property.location
                                                            }
                                                            ,{" "}
                                                            {
                                                                property.city
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Owner */}
                                            <td className="px-5 py-4">
                                                <p className="font-medium">
                                                    {
                                                        property.ownerName
                                                    }
                                                </p>

                                                <p className="text-sm text-gray-500">
                                                    {
                                                        property.ownerEmail
                                                    }
                                                </p>
                                            </td>

                                            {/* Rent */}
                                            <td className="px-5 py-4 font-semibold text-green-600">
                                                ৳{" "}
                                                {
                                                    property.rent
                                                }
                                            </td>

                                            {/* Type */}
                                            <td className="px-5 py-4 text-sm">
                                                {
                                                    property.propertyType
                                                }
                                            </td>

                                            {/* Status */}
                                            <td className="px-5 py-4">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                        property.status ===
                                                        "available"
                                                            ? "bg-green-100 text-green-700"
                                                            : property.status ===
                                                                "rented"
                                                              ? "bg-blue-100 text-blue-700"
                                                              : "bg-red-100 text-red-700"
                                                    }`}
                                                >
                                                    {
                                                        property.status
                                                    }
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/dashboard/properties/${property._id}`}
                                                        className="rounded-lg border px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                                                    >
                                                        View
                                                    </Link>

                                                    <PropertyActions
                                                        propertyId={
                                                            property._id
                                                        }
                                                    />
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}