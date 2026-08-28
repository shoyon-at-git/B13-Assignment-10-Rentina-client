import Link from "next/link";
import { FaHome, FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] items-center justify-center px-6">
            <div className="max-w-lg text-center">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FaHome className="text-3xl" />
                    </div>
                </div>

                <p className="text-7xl font-extrabold text-blue-600">404</p>

                <h1 className="mt-4 text-3xl font-bold text-gray-900">
                    Page Not Found
                </h1>

                <p className="mt-3 text-gray-500">
                    Sorry, the page you are looking for doesn&apos;t exist
                    or may have been moved.
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                >
                    <FaArrowLeft />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}