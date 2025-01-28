import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";
  const forwardedHost = request.headers.get("x-forwarded-host");

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(`${origin}/auth/auth-code-error`);
    }

    if (forwardedHost) {
      return NextResponse.redirect(`https://${forwardedHost}${next}`);
    }

    return NextResponse.redirect(`${origin}${next}`);
  }

  return NextResponse.redirect(origin);
}
