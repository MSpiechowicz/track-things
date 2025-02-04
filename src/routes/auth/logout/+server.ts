import { redirect, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals: { supabase } }) => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		return new Response(JSON.stringify({ error: 'Logout failed' }), {
			status: 500,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	redirect(303, '/');
};
