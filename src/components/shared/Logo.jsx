import Link from "next/link";
import { FaHome } from "react-icons/fa";

export default function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
    >
      <div className="rounded-lg border border-primary/20 bg-primary/10 p-2 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
        <FaHome className="text-xl text-primary group-hover:text-white" />
      </div>

      <h1 className="text-3xl font-black tracking-tight">
        Rent<span className="text-primary">ina</span>
      </h1>
    </Link>
  );
}