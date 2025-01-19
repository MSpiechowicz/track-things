import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="flex h-[96px] items-center">
      <Link href="/" className="flex flex-shrink-0 items-center">
        <span className="text-3xl font-bold text-white">track</span>
        <span className="text-3xl font-bold text-blue-600">things</span>
        <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">ALPHA</span>
      </Link>
    </nav>
  );
}
