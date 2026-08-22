"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function DeletePropertyButton({ propertyId, ownerId }) {
    const router = useRouter();

    const [showModal, setShowModal] = useState(false);
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/properties/${propertyId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ownerId,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || "Failed to delete property"
                );
            }

            toast.success("Property deleted successfully!");

            setShowModal(false);

            router.refresh();
        } catch (error) {
            console.error("Delete property error:", error);

            toast.error(
                error.message || "Failed to delete property"
            );
        } finally {
            setDeleting(false);
        }
    };

    return (
        <>
            {/* Delete Button */}
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
            >
                Delete
            </button>

            {/* Confirmation Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">

                        <h2 className="text-xl font-bold text-gray-900">
                            Delete Property?
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to delete this
                            property? This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            {/* Cancel */}
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                disabled={deleting}
                                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            {/* Confirm Delete */}
                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={deleting}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {deleting
                                    ? "Deleting..."
                                    : "Yes, Delete"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}