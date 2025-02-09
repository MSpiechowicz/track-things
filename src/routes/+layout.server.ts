import { getOrCreateUserProfile } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const { user } = await locals.safeGetUser();

	// Only get profile if we have a valid session
	const userProfile = user ? await getOrCreateUserProfile(locals) : null;

	return {
		userProfile,
		cookies: cookies.getAll()
	};
};
