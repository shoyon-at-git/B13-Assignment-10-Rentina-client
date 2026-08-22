"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";

const banners = [
    {
        title: "Find Your Perfect Home",
        description:
            "Discover comfortable and affordable properties that perfectly match your lifestyle.",
        image:
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop",
        button: "Explore Properties",
    },
    {
        title: "Rent Smarter. Live Better.",
        description:
            "Browse verified rental properties and find your next home without the hassle.",
        image:
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1600&auto=format&fit=crop",
        button: "Find a Home",
    },
    {
        title: "List Your Property",
        description:
            "Own a property? Reach potential tenants and manage your rentals easily with Rentina.",
        image:
            "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=1600&auto=format&fit=crop",
        button: "Add Property",
    },
];

export default function RentinaBanner() {
    return (
        <section className="w-full">
            <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                className="h-[500px] md:h-[600px]"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative h-full w-full overflow-hidden">
                            {/* Background Image */}
                            <img
                                src={banner.image}
                                alt={banner.title}
                                className="absolute inset-0 h-full w-full object-cover"
                            />

                            {/* Dark Overlay */}
                            <div className="absolute inset-0 bg-black/55" />

                            {/* Content */}
                            <div className="relative z-10 flex h-full items-center">
                                <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
                                    <div className="max-w-2xl text-white">

                                        <p className="mb-4 text-sm font-semibold uppercase tracking-[4px] text-blue-300">
                                            Welcome to Rentina
                                        </p>

                                        <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                                            {banner.title}
                                        </h1>

                                        <p className="mt-6 max-w-xl text-base leading-7 text-gray-200 md:text-lg">
                                            {banner.description}
                                        </p>

                                        <div className="mt-8 flex flex-wrap gap-4">
                                            <Link
                                                href="/properties"
                                                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
                                            >
                                                {banner.button}
                                            </Link>

                                            <Link
                                                href="/register"
                                                className="rounded-lg border border-white/70 bg-white/10 px-6 py-3 font-semibold text-white backdrop-blur-sm transition hover:bg-white hover:text-black"
                                            >
                                                Get Started
                                            </Link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}