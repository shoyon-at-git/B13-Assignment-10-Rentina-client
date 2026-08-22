import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import AddPropertyForm from "@/components/dashboard/owner/add-property-form";

export default async function AddPropertyPage() {
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

    return (
        <AddPropertyForm
            ownerId={session.user.id}
            ownerName={session.user.name}
            ownerEmail={session.user.email}
        />
    );
}