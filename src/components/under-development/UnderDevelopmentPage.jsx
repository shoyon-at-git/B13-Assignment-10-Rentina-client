import Link from "next/link";
import {
    FaCode,
    FaArrowLeft,
    FaTools,
} from "react-icons/fa";

export default function UnderDevelopmentPage() {
    return (
        <main className="flex min-h-[80vh] items-center justify-center px-6">
            <div className="max-w-xl text-center">
                <div className="mb-6 flex justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                        <FaTools className="text-3xl" />
                    </div>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600">
                    <FaCode />
                    Feature in Development
                </div>

                <h1 className="mt-5 text-3xl font-bold text-gray-900">
                    We&apos;re Building Something Great
                </h1>

                <p className="mt-3 text-gray-500">
                    This feature is currently under development. We&apos;re
                    working hard to bring it to Rentina soon.
                </p>

                <div className="mx-auto mt-7 h-2 max-w-xs overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-2/3 rounded-full bg-blue-600" />
                </div>

                <p className="mt-3 text-sm text-gray-400">
                    Coming soon...
                </p>

                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-lg border px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-100"
                >
                    <FaArrowLeft />
                    Back to Home
                </Link>
            </div>
        </main>
    );
}