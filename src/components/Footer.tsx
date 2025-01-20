import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-[64px] items-center justify-center text-white">
      <div className="container mx-auto mb-6 flex flex-col justify-between gap-3 text-sm md:mb-0 md:flex-row md:items-center md:gap-0">
        <p className="order-3 md:order-1">© 2025 Maciej Spiechowicz. All rights reserved.</p>
        <Link href="/terms-of-service" className="order-1 hover:underline md:order-2">
          Terms of Service
        </Link>
        <div className="order-1 flex gap-4 md:order-2">
          <Link
            href="https://github.com/MSpiechowicz/track-things"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <Image src="/github.svg" width={24} height={24} alt="GitHub" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
