import { getOrCreateUserProfile } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	// Get authenticated user data
	const { data: { user } } = await locals.supabase.auth.getUser();
	const { session } = await locals.safeGetSession();

	// Only get profile if we have an authenticated user
	const userProfile = user ? await getOrCreateUserProfile(locals) : null;

	return {
		session,
		userProfile,
		cookies: cookies.getAll()
	};
};
