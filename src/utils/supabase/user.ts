import type { User } from "@supabase/supabase-js";
import { supabase } from "./client";

export async function getUser(): Promise<User | null> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function isUserLoggedIn(): Promise<boolean> {
  const user = await getUser();

  return !!user;
}
