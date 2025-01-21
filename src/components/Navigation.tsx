import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { LoginDialog } from "./auth/LoginDialog";

export default function Navigation() {
  return (
    <nav className="flex h-[96px] items-center border-b border-white border-opacity-15 justify-between">
      <Link href="/" className="flex flex-shrink-0 items-center">
        <div className="sm:hidden flex text-3xl font-bold">
          <span className="text-white">t</span>
          <Image src="/foots.svg" alt="Logo" width={12} height={12} />
          <span className="text-blue-600">t</span>
        </div>
        <div className="hidden sm:flex text-3xl font-bold">
          <span className="text-white">track</span>
          <Image src="/foots.svg" alt="Logo" width={12} height={12} />
          <span className="text-blue-600">things</span>
        </div>
        <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">ALPHA</span>
      </Link>
      <LoginDialog
        trigger={
          <Button>
            Sign In
          </Button>
        }
      />
    </nav>
  );
}
