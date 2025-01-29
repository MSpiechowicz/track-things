"use client";

import { Button } from "@/components/ui/button";
import { UserMenu } from "@/components/user/UserMenu";
import { useUserStore } from "@/store/userStore";
import { fetchAccountSettingsDisplayName } from "@/utils/supabase/accountSettings";
import { supabase } from "@/utils/supabase/client";
import { type Session } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Navigation() {
  const router = useRouter();
  const { id, displayName, setId, setName, setEmail, setDisplayName } = useUserStore();

  const updateUserState = async (session: Session | null) => {
    if (session?.user) {
      const displayName = await fetchAccountSettingsDisplayName(session.user.id);

      setId(session.user.id);
      setName(session.user.user_metadata.full_name as string);
      setEmail(session.user.email ?? "");
      setDisplayName(displayName ?? "");
    } else {
      setId(null);
      setName(null);
      setEmail(null);
      setDisplayName(null);
    }
  };

  const getInitialSession = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    await updateUserState(session);
  };

  const listenForAuthChanges = async () => {
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      await updateUserState(session);
    });

    return listener;
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        await getInitialSession();
        const listener = await listenForAuthChanges();

        return () => listener.subscription.unsubscribe();
      } catch (error) {
        console.error("Auth initialization error:", error);
      }
    };

    void initializeAuth();
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (id !== null) {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <nav className="flex h-[96px] items-center justify-between border-b border-white border-opacity-15">
      <div onClick={handleLogoClick} className="flex flex-shrink-0 items-center cursor-pointer">
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
      </div>
      {id !== null ? (
        <div className="flex items-center gap-4 text-white">
          <span className="hidden text-lg sm:block">{displayName}</span>
          <div className="hidden sm:block">
            <UserMenu isMobile={false} />
          </div>
          <div className="sm:hidden">
            <UserMenu isMobile={true} />
          </div>
        </div>
      ) : (
        <Button onClick={() => router.push("/signin")}>Sign In</Button>
      )}
    </nav>
  );
}
