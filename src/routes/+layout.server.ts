import { getOrCreateUserProfile } from '$lib/auth';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals, cookies }) => {
	const { session } = await locals.safeGetSession();

	const userProfile = await getOrCreateUserProfile(locals);

	return {
		session,
		userProfile,
		cookies: cookies.getAll()
	};
};
