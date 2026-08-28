import { FaSearch, FaCalendarCheck, FaKey, FaPlusCircle, FaUsers, FaChartLine } from "react-icons/fa";

const tenantSteps = [
    {
        icon: FaSearch,
        title: "Find a Property",
        description: "Search and explore properties based on your needs.",
    },
    {
        icon: FaCalendarCheck,
        title: "Book Your Stay",
        description: "Choose your preferred property and send a booking request.",
    },
    {
        icon: FaKey,
        title: "Move In",
        description: "Complete the process and enjoy your new rental home.",
    },
];

const ownerSteps = [
    {
        icon: FaPlusCircle,
        title: "List Your Property",
        description: "Add your property with details, images, rent and location.",
    },
    {
        icon: FaUsers,
        title: "Manage Bookings",
        description: "Review tenant requests and manage your property bookings.",
    },
    {
        icon: FaChartLine,
        title: "Grow Your Business",
        description: "Keep your properties active and manage your rental business.",
    },
];

export default function HowItWorks() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        How It Works
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                        Renting Made Simple
                    </h2>

                    <p className="mt-4 text-gray-500">
                        Whether you are looking for a home or listing one,
                        Rentina keeps everything simple.
                    </p>
                </div>

                <div className="mt-14 grid gap-10 lg:grid-cols-2">

                    {/* Tenant */}
                    <div className="rounded-2xl border bg-gray-50 p-8">
                        <div>
                            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
                                For Tenants
                            </span>

                            <h3 className="mt-5 text-2xl font-bold text-gray-900">
                                Find your next home
                            </h3>
                        </div>

                        <div className="mt-8 space-y-6">
                            {tenantSteps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.title}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
                                            <Icon />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-blue-600">
                                                    0{index + 1}
                                                </span>

                                                <h4 className="font-semibold text-gray-900">
                                                    {step.title}
                                                </h4>
                                            </div>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Owner */}
                    <div className="rounded-2xl border bg-gray-50 p-8">
                        <div>
                            <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
                                For Owners
                            </span>

                            <h3 className="mt-5 text-2xl font-bold text-gray-900">
                                Manage your properties
                            </h3>
                        </div>

                        <div className="mt-8 space-y-6">
                            {ownerSteps.map((step, index) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        key={step.title}
                                        className="flex gap-4"
                                    >
                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-green-600 text-white">
                                            <Icon />
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-semibold text-green-600">
                                                    0{index + 1}
                                                </span>

                                                <h4 className="font-semibold text-gray-900">
                                                    {step.title}
                                                </h4>
                                            </div>

                                            <p className="mt-1 text-sm text-gray-500">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}