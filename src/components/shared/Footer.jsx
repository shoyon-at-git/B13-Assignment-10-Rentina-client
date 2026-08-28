import Link from "next/link";
import {
    FaHome,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaGithub,
} from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-950 text-gray-300">

            {/* Main Footer */}
            <div className="mx-auto max-w-7xl px-6 py-14">
                <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-2xl font-bold text-white"
                        >
                            <FaHome className="text-blue-500" />
                            Rentina
                        </Link>

                        <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
                            A simple and reliable platform for discovering,
                            listing, and managing rental properties.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 transition hover:bg-blue-600 hover:text-white"
                            >
                                <FaFacebookF />
                            </a>

                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 transition hover:bg-blue-600 hover:text-white"
                            >
                                <FaTwitter />
                            </a>

                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 transition hover:bg-pink-600 hover:text-white"
                            >
                                <FaInstagram />
                            </a>

                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-800 transition hover:bg-gray-700 hover:text-white"
                            >
                                <FaGithub />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white">
                                    Home
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/dashboard/properties"
                                    className="hover:text-white"
                                >
                                    All Properties
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-white"
                                >
                                    About Us
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-white"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Users */}
                    <div>
                        <h3 className="font-semibold text-white">
                            For Users
                        </h3>

                        <ul className="mt-5 space-y-3 text-sm">

                            <li>
                                <Link
                                    href="/dashboard"
                                    className="hover:text-white"
                                >
                                    Dashboard
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/under-development"
                                    className="hover:text-white"
                                >
                                    Help Center
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-white">
                            Contact Us
                        </h3>

                        <div className="mt-5 space-y-3 text-sm text-gray-400">
                            <p>📍 Dinajpur, Bangladesh</p>
                            <p>📧 support@rentina.com</p>
                            <p>📞 +880 1XXX-XXXXXX</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-gray-800">
                <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-sm text-gray-500 sm:flex-row sm:items-center sm:justify-between">
                    <p>
                        © {new Date().getFullYear()} Rentina. All rights reserved.
                    </p>

                    <div className="flex gap-5">
                        <Link
                            href="/privacy"
                            className="hover:text-white"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="hover:text-white"
                        >
                            Terms & Conditions
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}