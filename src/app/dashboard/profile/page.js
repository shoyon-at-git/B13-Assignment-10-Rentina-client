import Image from "next/image";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export default async function ProfilePage() {
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

    const user = session.user;

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">
                        My Profile
                    </h1>

                    <p className="mt-1 text-gray-500">
                        View your account information.
                    </p>
                </div>

                {/* Profile Card */}
                <div className="overflow-hidden rounded-2xl border bg-white shadow-sm">
                    {/* Top Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-10">
                        <div className="flex flex-col items-center">
                            {user.image ? (
                                <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
                                    <Image
                                        src={user.image}
                                        alt={user.name || "Profile"}
                                        fill
                                        unoptimized
                                        className="object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="flex h-28 w-28 items-center justify-center rounded-full border-4 border-white bg-gray-200 text-4xl font-bold text-gray-600 shadow-lg">
                                    {user.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || "U"}
                                </div>
                            )}

                            <h2 className="mt-4 text-2xl font-bold text-white">
                                {user.name || "Unknown User"}
                            </h2>

                            <span className="mt-2 rounded-full bg-white/20 px-4 py-1 text-sm font-medium capitalize text-white">
                                {user.role || "User"}
                            </span>
                        </div>
                    </div>

                    {/* Information */}
                    <div className="p-6">
                        <h3 className="mb-5 text-lg font-semibold">
                            Account Information
                        </h3>

                        <div className="grid gap-5 sm:grid-cols-2">
                            {/* Name */}
                            <div className="rounded-xl border bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Full Name
                                </p>

                                <p className="mt-1 font-semibold">
                                    {user.name || "Not available"}
                                </p>
                            </div>

                            {/* Email */}
                            <div className="rounded-xl border bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Email Address
                                </p>

                                <p className="mt-1 break-all font-semibold">
                                    {user.email || "Not available"}
                                </p>
                            </div>

                            {/* Role */}
                            <div className="rounded-xl border bg-gray-50 p-4">
                                <p className="text-sm text-gray-500">
                                    Account Role
                                </p>

                                <p className="mt-1 font-semibold capitalize">
                                    {user.role || "User"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}