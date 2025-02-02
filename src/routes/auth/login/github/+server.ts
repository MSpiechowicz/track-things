import { redirect, type RequestEvent } from "@sveltejs/kit";

export const GET = async (event: RequestEvent) => {
  const {
    locals: { supabase },
    url
  } = event;

  const { data } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: url.origin + '/auth/callback',
    },
  });

  console.log(data.url);

  if (data.url) {
    redirect(307, data.url);
  }

  redirect(307, '/auth/error');
}
