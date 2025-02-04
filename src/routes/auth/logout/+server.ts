import { redirect, type RequestEvent } from '@sveltejs/kit';

export const GET = async (event: RequestEvent) => {
	const {
		locals: { supabase }
	} = event;

	const { error } = await supabase.auth.signOut();

	if (error) {
		redirect(307, '/auth/auth-code-error');
	}

	redirect(307, '/');
};
