import Link from "next/link";

export default function NavLinks() {
    return (
        <>
            <Link
                href="/"
                className="font-medium hover:text-primary transition"
            >
                Home
            </Link>

            <Link
                href="/dashboard/properties"
                className="font-medium hover:text-primary transition"
            >
                All Properties
            </Link>
        </>
    );
}