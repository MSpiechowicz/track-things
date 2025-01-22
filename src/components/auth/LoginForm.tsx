"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";

export function LoginForm() {
  const handleGithubSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        }
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <Input type="email" placeholder="Email" className="h-11" />
        <Input type="password" placeholder="Password" className="h-11" />
        <Button type="submit" className="h-11 w-full">
          Sign In
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Button
          variant="outline"
          className="h-11 w-full font-normal"
          onClick={handleGithubSignIn}
        >
          <Image src="/github-black.svg" alt="GitHub" width={20} height={20} className="mr-1" />
          GitHub
        </Button>
        <Button variant="outline" className="h-11 w-full font-normal">
          <Image src="/google.svg" alt="Google" width={20} height={20} className="mr-1" />
          Google
        </Button>
      </div>

      <p className="text-muted-foreground text-center text-sm">
        By signing in, you agree to our{" "}
        <Link href="/terms-of-service" className="hover:text-primary underline underline-offset-4">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
