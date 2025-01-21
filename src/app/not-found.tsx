"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 text-white">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">404 - Page Not Found</h1>
      <p className="text-muted-foreground text-center text-lg">
        Sorry, we couldn&apos;t find the page you&apos;re looking for.
      </p>
      <div className="mt-6">
        <Button onClick={() => router.push("/")}>Return Home</Button>
      </div>
    </main>
  );
}
