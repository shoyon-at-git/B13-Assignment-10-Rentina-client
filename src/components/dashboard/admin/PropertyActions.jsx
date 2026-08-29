"use client";

import { useState } from "react";

export default function PropertyActions({ propertyId }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        const confirmed = confirm(
            "Are you sure you want to delete this property?"
        );

        if (!confirmed) return;

        try {
            setLoading(true);

            const serverUrl =
                process.env.NEXT_PUBLIC_SERVER_URL;

            const response = await fetch(
                `${serverUrl}/api/admin/properties/${propertyId}`,
                {
                    method: "DELETE",
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                alert(
                    data.message ||
                        "Failed to delete property"
                );
                return;
            }

            alert("Property deleted successfully");

            window.location.reload();
        } catch (error) {
            console.error(
                "Delete property error:",
                error
            );

            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={loading}
            className="ml-2 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {loading ? "Deleting..." : "Delete"}
        </button>
    );
}