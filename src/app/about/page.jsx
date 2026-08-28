import Link from "next/link";
import {
    FaHome,
    FaSearch,
    FaCalendarCheck,
    FaShieldAlt,
    FaUsers,
    FaHandshake,
    FaKey,
    FaCheckCircle,
    FaArrowRight,
} from "react-icons/fa";

export default function AboutPage() {
    return (
        <main className="bg-base-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary text-primary-content">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

                <div className="relative mx-auto max-w-7xl px-6 py-24 text-center md:py-28">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/15 shadow-lg backdrop-blur">
                        <FaHome className="text-4xl text-white" />
                    </div>

                    <p className="mb-3 text-sm font-bold uppercase tracking-widest text-white/80">Welcome to Rentina</p>

                    <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
                        Find a place you can
                        <span className="block">call home.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
                        Rentina makes property renting easier by connecting tenants with property owners through a
                        simple and convenient platform.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                <div className="grid items-center gap-14 lg:grid-cols-2">
                    <div>
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">Who We Are</span>

                        <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-5xl">
                            A simpler way to find and manage rental properties.
                        </h2>

                        <p className="mt-6 leading-8 text-base-content/70">
                            Rentina is a modern property rental and booking platform designed to simplify the rental
                            experience for both tenants and property owners.
                        </p>

                        <p className="mt-4 leading-8 text-base-content/70">
                            Tenants can discover available properties, explore important details, and submit booking
                            requests. Property owners can list their properties and manage incoming requests from one
                            convenient platform.
                        </p>

                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="shrink-0 text-primary" />
                                <span>Search and discover suitable properties</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="shrink-0 text-primary" />
                                <span>Submit and manage booking requests</span>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaCheckCircle className="shrink-0 text-primary" />
                                <span>Separate experiences for tenants and owners</span>
                            </div>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-2 gap-4 md:gap-6">
                        <div className="rounded-2xl border border-base-300 bg-base-200 p-6 transition hover:-translate-y-1 hover:shadow-lg md:p-8">
                            <FaUsers className="text-3xl text-primary" />
                            <h3 className="mt-5 text-lg font-bold">For Everyone</h3>
                            <p className="mt-2 text-sm leading-6 text-base-content/60">
                                A platform built for both property owners and tenants.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-base-300 bg-base-200 p-6 transition hover:-translate-y-1 hover:shadow-lg md:p-8">
                            <FaShieldAlt className="text-3xl text-primary" />
                            <h3 className="mt-5 text-lg font-bold">Trusted Experience</h3>
                            <p className="mt-2 text-sm leading-6 text-base-content/60">
                                A structured rental process with clear booking actions.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-base-300 bg-base-200 p-6 transition hover:-translate-y-1 hover:shadow-lg md:p-8">
                            <FaSearch className="text-3xl text-primary" />
                            <h3 className="mt-5 text-lg font-bold">Easy Discovery</h3>
                            <p className="mt-2 text-sm leading-6 text-base-content/60">
                                Search and explore properties based on your needs.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-base-300 bg-base-200 p-6 transition hover:-translate-y-1 hover:shadow-lg md:p-8">
                            <FaHandshake className="text-3xl text-primary" />
                            <h3 className="mt-5 text-lg font-bold">Easy Connection</h3>
                            <p className="mt-2 text-sm leading-6 text-base-content/60">
                                Connect tenants and owners through simple booking requests.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="border-y border-base-300 bg-base-200">
                <div className="mx-auto grid max-w-7xl grid-cols-2 px-6 py-12 md:grid-cols-4">
                    <div className="border-base-300 px-4 text-center md:border-r">
                        <h3 className="text-3xl font-extrabold text-primary md:text-4xl">2</h3>
                        <p className="mt-2 text-sm text-base-content/60">User Roles</p>
                    </div>

                    <div className="border-base-300 px-4 text-center md:border-r">
                        <h3 className="text-3xl font-extrabold text-primary md:text-4xl">24/7</h3>
                        <p className="mt-2 text-sm text-base-content/60">Platform Access</p>
                    </div>

                    <div className="border-base-300 px-4 pt-8 text-center md:border-r md:pt-0">
                        <h3 className="text-3xl font-extrabold text-primary md:text-4xl">1</h3>
                        <p className="mt-2 text-sm text-base-content/60">Connected Platform</p>
                    </div>

                    <div className="px-4 pt-8 text-center md:pt-0">
                        <h3 className="text-3xl font-extrabold text-primary md:text-4xl">100%</h3>
                        <p className="mt-2 text-sm text-base-content/60">User Focused</p>
                    </div>
                </div>
            </section>

            {/* For Owners & Tenants */}
            <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-primary">Built For You</span>

                    <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">
                        A better rental experience for everyone
                    </h2>

                    <p className="mt-4 leading-7 text-base-content/60">
                        Whether you are searching for a home or managing rental properties, Rentina keeps the process
                        simple and organized.
                    </p>
                </div>

                <div className="mt-12 grid gap-6 md:grid-cols-2">
                    {/* Tenant */}
                    <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm md:p-10">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <FaKey className="text-2xl text-primary" />
                        </div>

                        <h3 className="mt-6 text-2xl font-bold">For Tenants</h3>

                        <p className="mt-3 leading-7 text-base-content/60">
                            Discover properties that match your preferred location, property type, and budget.
                        </p>

                        <ul className="mt-6 space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-primary" />
                                Browse available properties
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-primary" />
                                View complete property details
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-primary" />
                                Send booking requests to owners
                            </li>
                        </ul>
                    </div>

                    {/* Owner */}
                    <div className="rounded-3xl border border-base-300 bg-base-100 p-8 shadow-sm md:p-10">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                            <FaHome className="text-2xl text-primary" />
                        </div>

                        <h3 className="mt-6 text-2xl font-bold">For Property Owners</h3>

                        <p className="mt-3 leading-7 text-base-content/60">
                            List your properties and manage tenant booking requests from one convenient dashboard.
                        </p>

                        <ul className="mt-6 space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-primary" />
                                Add and manage rental properties
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-primary" />
                                Receive tenant booking requests
                            </li>

                            <li className="flex items-center gap-3">
                                <FaCheckCircle className="text-primary" />
                                Accept or reject requests
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="bg-base-200">
                <div className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                    <div className="mx-auto max-w-2xl text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">How It Works</span>

                        <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Renting made simple</h2>

                        <p className="mt-4 leading-7 text-base-content/60">
                            Find a property, send a request, and let the owner respond. Rentina keeps the process
                            straightforward.
                        </p>
                    </div>

                    <div className="relative mt-14 grid gap-8 md:grid-cols-3">
                        {/* Step 1 */}
                        <div className="relative rounded-3xl bg-base-100 p-8 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content shadow-md">
                                <FaSearch className="text-xl text-white" />
                            </div>

                            <div className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">Step 01</div>

                            <h3 className="mt-2 text-xl font-bold">Find a Property</h3>

                            <p className="mt-3 leading-7 text-base-content/60">
                                Search and explore properties based on location, property type, and budget.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="relative rounded-3xl bg-base-100 p-8 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content shadow-md">
                                <FaCalendarCheck className="text-xl text-white" />
                            </div>

                            <div className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">Step 02</div>

                            <h3 className="mt-2 text-xl font-bold">Send a Request</h3>

                            <p className="mt-3 leading-7 text-base-content/60">
                                Found the right place? Submit a booking request directly to the property owner.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="relative rounded-3xl bg-base-100 p-8 text-center shadow-sm">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-content shadow-md">
                                <FaHandshake className="text-xl text-white" />
                            </div>

                            <div className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">Step 03</div>

                            <h3 className="mt-2 text-xl font-bold">Get a Response</h3>

                            <p className="mt-3 leading-7 text-base-content/60">
                                The property owner reviews your request and accepts or rejects it based on availability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission */}
            <section className="mx-auto max-w-4xl px-6 py-24 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                    <FaHome className="text-3xl text-primary" />
                </div>

                <span className="mt-6 block text-sm font-bold uppercase tracking-widest text-primary">Our Mission</span>

                <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Making every rental journey easier</h2>

                <p className="mt-6 text-lg leading-8 text-base-content/60">
                    We believe finding a home should be simple and convenient. Rentina brings tenants and property
                    owners together in one organized digital platform, making property discovery and booking management
                    easier for everyone.
                </p>
            </section>

            {/* CTA */}
            <section className="bg-primary text-primary-content">
                <div className="mx-auto max-w-4xl px-6 py-20 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
                        <FaHome className="text-3xl text-white" />
                    </div>

                    <h2 className="mt-6 text-3xl font-extrabold text-white md:text-4xl">
                        Ready to find your next place?
                    </h2>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-white/90">
                        Explore available properties and take the first step toward finding a place that feels like
                        home.
                    </p>

                    <Link
                        href="/dashboard/properties"
                        className="btn mx-auto mt-8 flex w-fit items-center gap-2 border-none text-white hover:bg-base-200"
                    >
                        Explore Properties
                        <FaArrowRight className="text-white" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
