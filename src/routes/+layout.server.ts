import { getOrCreateUserProfile } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const { session } = await locals.safeGetSession();

	// Only get profile if we have a valid session
	const userProfile = session?.user ? await getOrCreateUserProfile(locals) : null;

	return {
		session,
		userProfile,
		cookies: cookies.getAll()
	};
};
