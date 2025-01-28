import type { Session } from "@supabase/supabase-js";
import { supabase } from "./client";

export async function getSession(): Promise<Session | null> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return session;
}
