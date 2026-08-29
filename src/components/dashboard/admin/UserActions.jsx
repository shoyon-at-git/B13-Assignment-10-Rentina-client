"use client";

import { useState } from "react";

export default function UserActions({ user }) {
    const [role, setRole] = useState(user.role);
    const [loading, setLoading] = useState(false);

    const handleRoleChange = async (newRole) => {
        if (newRole === role) return;

        const confirmed = confirm(`Change ${user.name}'s role to ${newRole}?`);

        if (!confirmed) return;

        try {
            setLoading(true);

            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

            const response = await fetch(`${serverUrl}/api/users/${user._id}/role`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    role: newRole,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(data.message || "Failed to update user role");
                return;
            }

            setRole(newRole);

            alert("User role updated successfully");

            window.location.reload();
        } catch (error) {
            console.error("Role update error:", error);

            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        const confirmed = confirm(`Are you sure you want to delete ${user.name}?`);

        if (!confirmed) return;

        try {
            setLoading(true);

            const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

            const response = await fetch(`${serverUrl}/api/users/${user._id}`, {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(data.message || "Failed to delete user");
                return;
            }

            alert("User deleted successfully");

            window.location.reload();
        } catch (error) {
            console.error("Delete user error:", error);

            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-2">
            <select
                value={role}
                disabled={loading}
                onChange={(e) => handleRoleChange(e.target.value)}
                className="rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value="tenant">Tenant</option>

                <option value="owner">Owner</option>

                <option value="admin">Admin</option>
            </select>

            {user.role !== "admin" && (
                <button
                    onClick={handleDelete}
                    disabled={loading}
                    className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    Delete
                </button>
            )}
        </div>
    );
}
