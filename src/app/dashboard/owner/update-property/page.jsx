import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import EditPropertyForm from "@/components/dashboard/owner/EditPropertyForm";

export default async function EditPropertyPage({ params }) {
    const { id } = await params;

    // =========================
    // Get Current Session
    // =========================

    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    // =========================
    // Check Owner Role
    // =========================

    if (session.user.role !== "owner") {
        redirect("/dashboard");
    }

    // =========================
    // Get Server URL
    // =========================

    const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

    // =========================
    // Fetch Property
    // =========================

    const response = await fetch(
        `${serverUrl}/api/properties/${id}`,
        {
            cache: "no-store",
        }
    );

    if (!response.ok) {
        notFound();
    }

    const data = await response.json();

    if (!data.success || !data.property) {
        notFound();
    }

    const property = data.property;

    // =========================
    // Ownership Check
    // =========================

    if (property.ownerId !== session.user.id) {
        redirect("/dashboard/owner/my-properties");
    }

    // =========================
    // Render Edit Form
    // =========================

    return (
        <EditPropertyForm
            property={property}
            ownerId={session.user.id}
        />
    );
}