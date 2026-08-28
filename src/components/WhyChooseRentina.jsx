import {
    FaShieldAlt,
    FaSearchLocation,
    FaHeadset,
    FaHome,
} from "react-icons/fa";

const features = [
    {
        icon: FaSearchLocation,
        title: "Find the Right Place",
        description:
            "Explore verified rental properties and find a home that matches your location, budget, and lifestyle.",
    },
    {
        icon: FaShieldAlt,
        title: "Safe & Reliable",
        description:
            "Rentina is designed to make property discovery and rental management simple, transparent, and reliable.",
    },
    {
        icon: FaHome,
        title: "Easy Property Management",
        description:
            "Owners can easily list properties, manage bookings, and keep track of their rental activities.",
    },
    {
        icon: FaHeadset,
        title: "Simple Experience",
        description:
            "From discovering a property to managing bookings, Rentina keeps the entire experience straightforward.",
    },
];

export default function WhyChooseRentina() {
    return (
        <section className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-6">

                {/* Heading */}
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                        Why Rentina
                    </p>

                    <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
                        Everything You Need for a
                        <span className="text-blue-600"> Better Rental Experience</span>
                    </h2>

                    <p className="mt-4 text-gray-500">
                        We make finding, listing, and managing rental properties
                        easier for everyone.
                    </p>
                </div>

                {/* Features */}
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={feature.title}
                                className="group rounded-2xl border bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                    <Icon className="text-2xl" />
                                </div>

                                <h3 className="mt-5 text-lg font-semibold text-gray-900">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 text-sm leading-6 text-gray-500">
                                    {feature.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}