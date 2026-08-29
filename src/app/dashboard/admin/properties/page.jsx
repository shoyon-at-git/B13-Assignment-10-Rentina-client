import { headers } from "next/headers";
import { auth } from "@/lib/auth";

import AdminPropertiesClient from "@/components/dashboard/admin/AdminPropertiesClient";

export default async function AdminPropertiesPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Unauthorized
                </h2>
            </div>
        );
    }

    if (session.user.role !== "admin") {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Access Denied
                </h2>

                <p className="mt-2 text-gray-500">
                    Only administrators can access this page.
                </p>
            </div>
        );
    }

    const serverUrl =
        process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${serverUrl}/api/admin/properties`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    const properties = data.success
        ? data.properties
        : [];

    return (
        <div className="space-y-6 p-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Properties Management
                </h1>

                <p className="mt-1 text-gray-500">
                    Manage all properties listed on Rentina.
                </p>
            </div>

            <AdminPropertiesClient
                properties={properties}
            />
        </div>
    );
}