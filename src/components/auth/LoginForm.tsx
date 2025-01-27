"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabase/client";
import type { Provider } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();

  const handleSignIn = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error(`Error signing in with provider: ${provider}`, error);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-3">
        <Button
          variant="outline"
          className="h-11 w-full font-normal"
          onClick={() => handleSignIn("github")}
        >
          <Image src="/github-black.svg" alt="GitHub" width={20} height={20} className="mr-1" />
          Continue with GitHub
        </Button>
        <Button
          variant="outline"
          className="h-11 w-full font-normal"
          onClick={() => handleSignIn("google")}
        >
          <Image src="/google.svg" alt="Google" width={20} height={20} className="mr-1" />
          Continue with Google
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="text-muted-foreground bg-white px-2">or</span>
        </div>
      </div>

      <Button
        variant="outline"
        className="h-11 w-full font-normal"
        onClick={() => router.push("/")}
      >
        Return to Home Page
      </Button>

      <p className="text-muted-foreground text-center text-sm">
        By signing in, you agree to our{" "}
        <Link href="/terms-of-service" className="hover:text-primary underline underline-offset-4">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
