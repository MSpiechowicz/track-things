"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import type { Provider } from "@supabase/supabase-js";
import Image from "next/image";
import Link from "next/link";

export function LoginForm() {
  const handleSignIn = async (provider: Provider) => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
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

      <p className="text-center text-sm text-muted-foreground">
        By signing in, you agree to our{" "}
        <Link href="/terms-of-service" className="hover:text-primary underline underline-offset-4">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
