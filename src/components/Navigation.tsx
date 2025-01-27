"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsAuthenticated(!!session);
      }
    );

    // Check initial session
    void supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="flex h-[96px] items-center justify-between border-b border-white border-opacity-15">
      <Link href="/" className="flex flex-shrink-0 items-center">
        <div className="flex text-3xl font-bold sm:hidden">
          <span className="text-white">t</span>
          <Image src="/foots.svg" alt="Logo" width={12} height={12} className="h-auto w-auto" priority />
          <span className="text-blue-600">t</span>
        </div>
        <div className="hidden text-3xl font-bold sm:flex">
          <span className="text-white">track</span>
          <Image src="/foots.svg" alt="Logo" width={12} height={12} className="h-auto w-auto" priority />
          <span className="text-blue-600">things</span>
        </div>
        <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">ALPHA</span>
      </Link>
      {isAuthenticated ? (
        <Button onClick={handleSignOut}>
          Sign Out
        </Button>
      ) : (
        <Button onClick={() => router.push("/signin")}>Sign In</Button>
      )}
    </nav>
  );
}
