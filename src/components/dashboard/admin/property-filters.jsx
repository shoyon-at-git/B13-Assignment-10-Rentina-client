"use client";

export default function PropertyFilters({
    search,
    setSearch,
    propertyType,
    setPropertyType,
    status,
    setStatus,
    sort,
    setSort,
}) {
    return (
        <div className="rounded-xl border bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">

                {/* Search */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Search
                    </label>

                    <input
                        type="text"
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                        placeholder="Search property..."
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Property Type */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Property Type
                    </label>

                    <select
                        value={propertyType}
                        onChange={(e) =>
                            setPropertyType(e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Types</option>
                        <option value="House">House</option>
                        <option value="Apartment">
                            Apartment
                        </option>
                        <option value="Flat">Flat</option>
                        <option value="Room">Room</option>
                        <option value="Studio">Studio</option>
                    </select>
                </div>

                {/* Status */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Status
                    </label>

                    <select
                        value={status}
                        onChange={(e) =>
                            setStatus(e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Status</option>
                        <option value="available">
                            Available
                        </option>
                        <option value="rented">
                            Rented
                        </option>
                        <option value="unavailable">
                            Unavailable
                        </option>
                    </select>
                </div>

                {/* Sort */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Sort by Rent
                    </label>

                    <select
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                        className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">
                            Default
                        </option>

                        <option value="low-to-high">
                            Low to High
                        </option>

                        <option value="high-to-low">
                            High to Low
                        </option>
                    </select>
                </div>
            </div>
        </div>
    );
}