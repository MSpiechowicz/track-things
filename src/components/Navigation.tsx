"use client";

import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user/UserMenu";
import { useUserStore } from "@/store/userStore";
import { supabase } from "@/utils/supabase/client";
import { type Session } from '@supabase/supabase-js';
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Navigation() {
  const router = useRouter();
  const [user, setUser] = useState<{
    id: string;
    name: string | null;
    email: string | null;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { displayName, setDisplayName } = useUserStore();

  const fetchUserSettings = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("account_settings")
        .select("display_name")
        .eq("user_id", userId)
        .single();

      if (error) throw error;
      return data?.display_name as string;
    } catch (error) {
      console.error("Error fetching user settings:", error);
      return null;
    }
  };

  const updateUserState = async (session: Session | null) => {
    if (session?.user) {
      const displayName = await fetchUserSettings(session.user.id);
      setUser({
        id: session.user.id,
        name: displayName ?? session.user.user_metadata.full_name ?? session.user.email,
        email: session.user.email ?? null,
      });
    } else {
      setUser(null);
    }
    setIsLoading(false);
  };


  // ... existing code ...
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session } } = await supabase.auth.getSession();
        await updateUserState(session);

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (_event, session) => {
            await updateUserState(session);
          }
        );

        return () => subscription.unsubscribe();
      } catch (error) {
        console.error('Auth initialization error:', error);
      }
    };

    void initializeAuth();
  }, []);

  const fetchDisplayName = useCallback(async () => {
    if (!user?.id) return;

    const { data } = await supabase
      .from("account_settings")
      .select("display_name")
      .eq("user_id", user.id)
      .single();

    if (data?.display_name && !displayName) {
      setDisplayName(data.display_name as string);
    }
  }, [user?.id, displayName, setDisplayName]);

  useEffect(() => {
    void fetchDisplayName();
  }, [user, displayName, setDisplayName, fetchDisplayName]);

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <nav className="flex h-[96px] items-center justify-between border-b border-white border-opacity-15">
      <Link href="/" className="flex flex-shrink-0 items-center">
        <div className="flex text-3xl font-bold sm:hidden">
          <span className="text-white">t</span>
          <Image
            src="/foots.svg"
            alt="Logo"
            width={12}
            height={12}
            className="h-auto w-auto"
            priority
          />
          <span className="text-blue-600">t</span>
        </div>
        <div className="hidden text-3xl font-bold sm:flex">
          <span className="text-white">track</span>
          <Image
            src="/foots.svg"
            alt="Logo"
            width={12}
            height={12}
            className="h-auto w-auto"
            priority
          />
          <span className="text-blue-600">things</span>
        </div>
        <span className="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">ALPHA</span>
      </Link>
      {user ? (
        <div className="flex items-center gap-4 text-white">
          <span className="hidden text-lg sm:block">{displayName}</span>
          <div className="hidden sm:block">
            <UserMenu user={user} />
          </div>
          <div className="sm:hidden">
            <UserMenu user={user} isMobile />
          </div>
        </div>
      ) : (
        <Button onClick={() => router.push("/signin")}>Sign In</Button>
      )}
    </nav>
  );
}
