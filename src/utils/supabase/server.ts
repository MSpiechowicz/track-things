"use server";

import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )

  //return createServerClient(
  //  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  //  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  //  {
  //    cookies: {
  //      getAll() {
  //        return cookieStore.getAll();
  //      },
  //      get(name: string) {
  //        return cookieStore.get(name)?.value;
  //      },
  //      setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
  //        try {
  //          cookiesToSet.forEach(({ name, value, options }) =>
  //            cookieStore.set(name, value, options)
  //          )
  //        } catch (error: unknown) {
  //          // The `setAll` method was called from a Server Component.
  //          // This can be ignored if you have middleware refreshing
  //          // user sessions.
  //          console.error(error);
  //        }
  //      },
  //      //setAll(cookies: Record<string, string>) {
  //      //  for (const [name, value] of Object.entries(cookies)) {
  //      //    cookieStore.set({ name, value, ...options });
  //      //  }
  //      //},
  //      set(name: string, value: string, options: CookieOptions) {
  //        try {
  //          cookieStore.set({ name, value, ...options });
  //        } catch (error) {
  //          // The `set` method was called from a Server Component.
  //          // This can be ignored if you have middleware refreshing
  //          // user sessions.
  //        }
  //      },
  //      remove(name: string, options: CookieOptions) {
  //        try {
  //          cookieStore.set({ name, value: "", ...options });
  //        } catch (error) {
  //          // The `delete` method was called from a Server Component.
  //          // This can be ignored if you have middleware refreshing
  //          // user sessions.
  //        }
  //      },
  //    },
  //  },
  //);
}
