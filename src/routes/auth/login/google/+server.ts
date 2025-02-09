import { redirect, type RequestEvent } from "@sveltejs/kit";

export const GET = async (event: RequestEvent) => {
  const {
    locals: { supabase },
    url
  } = event;

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: url.origin + '/auth/callback',
    },
  });

  if (data.url) {
    redirect(307, data.url);
  }

  redirect(307, '/auth/auth-code-error');
}
