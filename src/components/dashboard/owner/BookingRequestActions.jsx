"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BookingRequestActions({
    bookingId,
    ownerId,
    status,
}) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    async function updateStatus(newStatus) {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${bookingId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ownerId,
                        status: newStatus,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok || !data.success) {
                toast.error(
                    data.message || "Failed to update booking."
                );
                return;
            }

            toast.success(data.message);

            router.refresh();
        } catch (error) {
            console.error(
                "Booking status update error:",
                error
            );

            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    // Already processed
    if (status !== "pending") {
        return null;
    }

    return (
        <div className="flex gap-3 border-t pt-4">
            <button
                type="button"
                disabled={loading}
                onClick={() => updateStatus("accepted")}
                className="rounded-lg bg-green-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Processing..." : "Accept"}
            </button>

            <button
                type="button"
                disabled={loading}
                onClick={() => updateStatus("rejected")}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Processing..." : "Reject"}
            </button>
        </div>
    );
}