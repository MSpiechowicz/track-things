"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
export function LoginForm() {
  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col space-y-4">
        <Input type="email" placeholder="Email" className="h-11" />
        <Input type="password" placeholder="Password" className="h-11" />
        <Button type="submit" className="w-full h-11">
          Sign In
        </Button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">
            Or continue with
          </span>
        </div>
      </div>
      <div className="flex flex-col space-y-3">
        <Button variant="outline" className="w-full h-11 font-normal">
          <Image
            src="/github-black.svg"
            alt="GitHub"
            width={22}
            height={22}
            className="mr-1 [&>g]:fill-white"
          />
          GitHub
        </Button>
        <Button variant="outline" className="w-full h-11 font-normal">
          <Image src="/google.svg" alt="Google" width={22} height={22} className="mr-1" />
          Google
        </Button>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        By signing in, you agree to our{" "}
        <Link href="/terms-of-service" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </Link>
      </p>
    </div>
  );
}
