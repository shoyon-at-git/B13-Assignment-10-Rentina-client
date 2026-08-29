"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

import UserActions from "@/components/dashboard/admin/UserActions";

export default function AdminUsersClient({ users }) {
    const [search, setSearch] = useState("");
    const [role, setRole] = useState("");

    const filteredUsers = useMemo(() => {
        let result = [...users];

        // Search by name or email
        if (search.trim()) {
            const searchText = search.trim().toLowerCase();

            result = result.filter((user) =>
                user.name?.toLowerCase().includes(searchText) ||
                user.email?.toLowerCase().includes(searchText)
            );
        }

        // Role filter
        if (role) {
            result = result.filter(
                (user) => user.role === role
            );
        }

        return result;
    }, [users, search, role]);

    return (
        <div className="space-y-5">
            {/* Filters */}
            <div className="rounded-xl border bg-white p-4 shadow-sm">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {/* Search */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Search User
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search by name or email..."
                            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {/* Role */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Role
                        </label>

                        <select
                            value={role}
                            onChange={(e) =>
                                setRole(e.target.value)
                            }
                            className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">
                                All Roles
                            </option>

                            <option value="tenant">
                                Tenant
                            </option>

                            <option value="owner">
                                Owner
                            </option>

                            <option value="admin">
                                Admin
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Result Count */}
            <div className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-700">
                    {filteredUsers.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-700">
                    {users.length}
                </span>{" "}
                users
            </div>

            {/* Empty Result */}
            {filteredUsers.length === 0 ? (
                <div className="rounded-xl border bg-white p-10 text-center shadow-sm">
                    <h2 className="text-xl font-semibold">
                        No users found
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Try changing your search or role filter.
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden rounded-xl border bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b bg-gray-50">
                                <tr>
                                    <th className="px-5 py-4 text-sm font-semibold">
                                        User
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-sm font-semibold">
                                        Role
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
                                {filteredUsers.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-gray-50"
                                    >
                                        {/* User */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                {user.image ? (
                                                    <div className="relative h-10 w-10 overflow-hidden rounded-full">
                                                        <Image
                                                            src={user.image}
                                                            alt={
                                                                user.name ||
                                                                "User"
                                                            }
                                                            fill
                                                            unoptimized
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-semibold text-gray-600">
                                                        {user.name
                                                            ?.charAt(0)
                                                            ?.toUpperCase() ||
                                                            "U"}
                                                    </div>
                                                )}

                                                <span className="font-medium">
                                                    {user.name ||
                                                        "Unknown User"}
                                                </span>
                                            </div>
                                        </td>

                                        {/* Email */}
                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {user.email}
                                        </td>

                                        {/* Role */}
                                        <td className="px-5 py-4">
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    user.role === "admin"
                                                        ? "bg-purple-100 text-purple-700"
                                                        : user.role === "owner"
                                                          ? "bg-blue-100 text-blue-700"
                                                          : "bg-green-100 text-green-700"
                                                }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                                Active
                                            </span>
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <UserActions user={user} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}