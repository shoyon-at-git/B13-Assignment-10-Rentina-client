import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";

import EditPropertyForm from "@/components/dashboard/owner/edit-property-form";

export default async function EditPropertyPage({ params }) {
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

    const { id } = await params;

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(
        `${serverUrl}/api/properties/${id}?ownerId=${session.user.id}`,
        {
            cache: "no-store",
        }
    );

    const data = await response.json();

    if (!response.ok || !data.success || !data.property) {
        return (
            <div className="p-6">
                <h2 className="text-xl font-semibold">
                    Property not found
                </h2>

                <p className="mt-2 text-gray-500">
                    This property does not exist or you do not have
                    permission to edit it.
                </p>

                <Link
                    href="/dashboard/owner/my-properties"
                    className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                    Back to My Properties
                </Link>
            </div>
        );
    }

    return (
        <EditPropertyForm
            property={data.property}
            ownerId={session.user.id}
        />
    );
}