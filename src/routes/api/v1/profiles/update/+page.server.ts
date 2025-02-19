import { accountSettingsSchemaValidator } from '$lib/validators/accountSettingsSchemaValidator';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { user } = await locals.safeGetUser();

		if (!user) {
			return fail(401, {
				message: 'Unauthorized'
			});
		}

		const form = await superValidate(request, accountSettingsSchemaValidator);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { displayName } = form.data;

		const existingAccountSettings = await locals.supabase
			.from('profile_settings')
			.select('id')
			.eq('profile_id', user.id)
			.maybeSingle();

		const upsertData = {
			profile_id: user.id,
			display_name: displayName,
			...(existingAccountSettings.data
				? {
						updated_at: new Date().toISOString(),
						id: existingAccountSettings.data.id
					}
				: {
						created_at: new Date().toISOString(),
						updated_at: new Date().toISOString()
					})
		};

		const result = await locals.supabase.from('profile_settings').upsert(upsertData, {
			onConflict: 'id',
			ignoreDuplicates: false
		});

		if (result.error) {
			return fail(500, {
				form
			});
		}

		return {
			success: true,
			form
		};
	}
};
