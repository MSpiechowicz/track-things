import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex h-[64px] items-center justify-center text-white mb-8 md:mb-0">
      <div className="container mx-auto flex flex-col justify-between gap-3 text-sm md:flex-row md:items-center md:gap-0">
        <p className="order-3 md:order-1">© 2025 Maciej Spiechowicz. All rights reserved.</p>
        <div className="order-1 flex gap-4 md:order-2">
          <Link href="/terms-of-service" className="order-1 hover:underline md:order-2">
            Terms of Service
          </Link>
        <Link href="/privacy-policy" className="order-2 hover:underline md:order-3">
            Privacy Policy
          </Link>
        </div>
        <div className="order-1 flex gap-4 md:order-3">
          <Link
            href="https://github.com/MSpiechowicz/track-things"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80"
          >
            <Image src="/github-white.svg" width={20} height={20} alt="GitHub" />
            <span>GitHub</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
