"use client";
import { useState } from "react";
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaPaperPlane,
} from "react-icons/fa";
import Link from "next/link";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, email, subject, message } = formData;

        const mailtoLink = `mailto:sanowarhossainshoyon123@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
            `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        )}`;

        window.location.href = mailtoLink;
    };
    return (
        <main className="bg-base-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-primary text-primary-content">
                <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
                <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white/10" />

                <div className="relative mx-auto max-w-7xl px-6 py-20 text-center md:py-24">
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-white/20 bg-white/15 shadow-lg backdrop-blur">
                        <FaEnvelope className="text-4xl text-white" />
                    </div>

                    <p className="mb-3 text-sm font-bold uppercase tracking-widest text-white/80">Get In Touch</p>

                    <h1 className="text-4xl font-extrabold leading-tight text-white md:text-6xl">
                        We’re here to
                        <span className="block">help you.</span>
                    </h1>

                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
                        Have a question about Rentina? Need help with a property or booking? Get in touch with us and
                        we’ll be happy to help.
                    </p>
                </div>
            </section>

            {/* Contact Information & Form */}
            <section className="mx-auto max-w-7xl px-6 py-20 md:py-24">
                <div className="grid items-start gap-10 lg:grid-cols-5">
                    {/* Contact Information */}
                    <div className="lg:col-span-2">
                        <span className="text-sm font-bold uppercase tracking-widest text-primary">
                            Contact Information
                        </span>

                        <h2 className="mt-3 text-3xl font-extrabold leading-tight md:text-4xl">
                            Let’s start a conversation
                        </h2>

                        <p className="mt-5 leading-7 text-base-content/60">
                            Whether you are looking for a property, managing a listing, or need assistance with your
                            booking request, we’re here to make your experience easier.
                        </p>

                        <div className="mt-8 space-y-4">
                            {/* Email */}
                            <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                                    <FaEnvelope className="text-xl text-white" />
                                </div>

                                <div>
                                    <h3 className="font-bold">Email Us</h3>
                                    <p className="mt-1 text-sm text-base-content/60">Get support through email</p>
                                </div>
                            </div>

                            {/* Phone */}
                            <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                                    <FaPhone className="text-xl text-white" />
                                </div>

                                <div>
                                    <h3 className="font-bold">Call Us</h3>
                                    <p className="mt-1 text-sm text-base-content/60">We’re available to assist you</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-200 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                                    <FaMapMarkerAlt className="text-xl text-white" />
                                </div>

                                <div>
                                    <h3 className="font-bold">Our Location</h3>
                                    <p className="mt-1 text-sm text-base-content/60">Bangladesh</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-3xl border border-base-300 bg-base-200 p-7 shadow-sm lg:col-span-3 md:p-10">
                        <div className="flex items-center gap-4">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary">
                                <FaPaperPlane className="text-xl text-white" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold">Send us a message</h2>

                                <p className="mt-1 text-sm text-base-content/60">We’d love to hear from you.</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                            {/* Name & Email */}
                            <div className="grid gap-5 md:grid-cols-2">
    {/* Name */}
    <div>
        <label className="mb-2 block text-sm font-semibold">
            Your Name
        </label>

        <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            className="input w-full rounded-lg border border-base-300 bg-base-100 pl-4"
        />
    </div>

    {/* Email */}
    <div>
        <label className="mb-2 block text-sm font-semibold">
            Email Address
        </label>

        <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="input w-full rounded-lg border border-base-300 bg-base-100 pl-4"
        />
    </div>
</div>

                            {/* Subject */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold">Subject</label>

                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="What would you like to know?"
                                    className="input w-full rounded-lg border border-base-300 bg-base-100 pl-4"
                                />
                            </div>

                            {/* Message */}
                            <div>
                                <label className="mb-2 block text-sm font-semibold">Message</label>

                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="6"
                                    placeholder="Write your message here..."
                                    className="textarea w-full rounded-lg border border-base-300 bg-base-100 pl-4"
                                ></textarea>
                            </div>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="btn btn-primary border px-5 py-2 rounded-md cursor-pointer flex items-center gap-2"
                            >
                                Send Message
                                <FaPaperPlane />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </main>
    );
}
