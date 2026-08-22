"use client";

import { useState } from "react";
import { toast } from "react-toastify";

export default function RequestRentButton({
    propertyId,
    tenantId,
    ownerId,
}) {
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);

    async function handleRequest() {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        propertyId,
                        tenantId,
                        ownerId,
                    }),
                }
            );

            const result = await response.json();

            if (!response.ok || !result.success) {
                toast.error(
                    result.message || "Failed to send rental request."
                );
                return;
            }

            toast.success(result.message);

            setShowPopup(false);

        } catch (error) {
            console.error("Rental request error:", error);

            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Request Button */}

            <button
                type="button"
                onClick={() => setShowPopup(true)}
                disabled={loading}
                className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                🏠 Request to Rent
            </button>


            {/* Confirmation Popup */}

            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                        <h2 className="text-xl font-semibold">
                            Request to Rent
                        </h2>

                        <p className="mt-3 text-gray-600">
                            Are you sure you want to send a rental
                            request for this property?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={() => setShowPopup(false)}
                                disabled={loading}
                                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleRequest}
                                disabled={loading}
                                className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
                            >
                                {loading
                                    ? "Sending..."
                                    : "Confirm Request"}
                            </button>

                        </div>

                    </div>

                </div>
            )}
        </>
    );
}