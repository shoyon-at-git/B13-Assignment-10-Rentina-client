import Image from "next/image";
import Link from "next/link";

export default async function PropertiesPage({ searchParams }) {
    const params = await searchParams;

    const search = params?.search || "";
    const propertyType = params?.propertyType || "";
    const sort = params?.sort || "";

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const queryParams = new URLSearchParams();

    if (search) {
        queryParams.set("search", search);
    }

    if (propertyType) {
        queryParams.set("propertyType", propertyType);
    }

    if (sort) {
        queryParams.set("sort", sort);
    }

    const queryString = queryParams.toString();

    const response = await fetch(
        `${serverUrl}/api/properties${
            queryString ? `?${queryString}` : ""
        }`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    const properties = data.success
        ? data.properties
        : [];

    return (
        <div className="space-y-6">

            {/* =========================
                Header
            ========================= */}

            <div>
                <h1 className="text-3xl font-bold">
                    Available Properties
                </h1>

                <p className="mt-1 text-gray-500">
                    Find your perfect rental property.
                </p>
            </div>

            {/* =========================
                Search + Filters
            ========================= */}

            <form
                method="GET"
                className="grid gap-4 rounded-xl border bg-white p-5 shadow-sm md:grid-cols-4"
            >

                {/* Search */}

                <div className="md:col-span-2">
                    <label
                        htmlFor="search"
                        className="mb-2 block text-sm font-medium"
                    >
                        Search by Location
                    </label>

                    <input
                        id="search"
                        name="search"
                        type="text"
                        defaultValue={search}
                        placeholder="Search location..."
                        className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Property Type */}

                <div>
                    <label
                        htmlFor="propertyType"
                        className="mb-2 block text-sm font-medium"
                    >
                        Property Type
                    </label>

                    <select
                        id="propertyType"
                        name="propertyType"
                        defaultValue={propertyType}
                        className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            All Types
                        </option>

                        <option value="Apartment">
                            Apartment
                        </option>

                        <option value="House">
                            House
                        </option>

                        <option value="Room">
                            Room
                        </option>

                        <option value="Villa">
                            Villa
                        </option>
                    </select>
                </div>

                {/* Sorting */}

                <div>
                    <label
                        htmlFor="sort"
                        className="mb-2 block text-sm font-medium"
                    >
                        Sort by Price
                    </label>

                    <select
                        id="sort"
                        name="sort"
                        defaultValue={sort}
                        className="h-10 w-full rounded-md border px-3 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            Default
                        </option>

                        <option value="low-to-high">
                            Price: Low to High
                        </option>

                        <option value="high-to-low">
                            Price: High to Low
                        </option>
                    </select>
                </div>

                {/* Buttons */}

                <div className="flex gap-2 md:col-span-4">
                    <button
                        type="submit"
                        className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                        Search & Filter
                    </button>

                    <Link
                        href="/dashboard/properties"
                        className="rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Reset
                    </Link>
                </div>
            </form>

            {/* =========================
                Result Count
            ========================= */}

            <div>
                <p className="text-sm text-gray-500">
                    {properties.length}{" "}
                    {properties.length === 1
                        ? "property"
                        : "properties"}{" "}
                    found
                </p>
            </div>

            {/* =========================
                No Properties
            ========================= */}

            {properties.length === 0 ? (
                <div className="rounded-lg border bg-white p-10 text-center">
                    <h2 className="text-xl font-semibold">
                        No properties found.
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Try changing your search or filters.
                    </p>
                </div>
            ) : (

                /* =========================
                   Property Cards
                ========================= */

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                    {properties.map((property) => (
                        <div
                            key={property._id}
                            className="overflow-hidden rounded-xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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

                            <div className="space-y-3 p-4">

                                <div className="flex items-start justify-between gap-3">
                                    <h2 className="text-xl font-semibold">
                                        {property.title}
                                    </h2>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        Approved
                                    </span>
                                </div>

                                {/* Location */}

                                <p className="text-sm text-gray-500">
                                    📍 {property.location},{" "}
                                    {property.city}
                                </p>

                                {/* Property Type */}

                                <p className="text-sm text-gray-600">
                                    🏠 {property.propertyType}
                                </p>

                                {/* Rent */}

                                <p className="text-lg font-semibold text-green-600">
                                    ৳ {property.rent}
                                    <span className="text-sm font-normal text-gray-500">
                                        /month
                                    </span>
                                </p>

                                {/* Property Info */}

                                <div className="grid grid-cols-3 gap-2 border-y py-3 text-center text-sm text-gray-600">

                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {property.bedrooms}
                                        </p>

                                        <p>Bedrooms</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {property.bathrooms}
                                        </p>

                                        <p>Bathrooms</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            {property.area}
                                        </p>

                                        <p>sqft</p>
                                    </div>

                                </div>

                                {/* Description */}

                                <p className="line-clamp-2 text-sm text-gray-500">
                                    {property.description}
                                </p>

                                {/* Owner */}

                                <div className="rounded-lg bg-gray-50 p-3">
                                    <p className="text-xs text-gray-500">
                                        Listed by
                                    </p>

                                    <p className="text-sm font-medium">
                                        {property.ownerName}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {property.ownerEmail}
                                    </p>
                                </div>

                                {/* View Details */}

                                <Link
                                    href={`/dashboard/properties/${property._id}`}
                                    className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-700"
                                >
                                    View Details
                                </Link>

                            </div>
                        </div>
                    ))}

                </div>
            )}
        </div>
    );
}