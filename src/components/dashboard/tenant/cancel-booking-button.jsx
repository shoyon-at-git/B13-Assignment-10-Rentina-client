"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function CancelBookingButton({
    bookingId,
    tenantId,
}) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    async function handleCancel() {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${bookingId}/cancel`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        tenantId,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                toast.error(
                    data.message || "Failed to cancel booking."
                );
                return;
            }

            toast.success(data.message);

            setOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Cancel booking error:", error);

            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Cancel Button */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                disabled={loading}
                className="w-full rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
            >
                Cancel Request
            </button>

            {/* Popup */}
            {open && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
                        <h2 className="text-xl font-bold">
                            Cancel Booking?
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Are you sure you want to cancel this
                            booking request?
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setOpen(false)}
                                disabled={loading}
                                className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                            >
                                Keep Request
                            </button>

                            <button
                                type="button"
                                onClick={handleCancel}
                                disabled={loading}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {loading
                                    ? "Cancelling..."
                                    : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}