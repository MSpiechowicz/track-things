import { teamSettingsCreateSchemaValidator } from '$lib/validators/teamSettingsCreateSchemaValidator';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, teamSettingsCreateSchemaValidator);

		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const { user } = await locals.safeGetUser();

		if (!user) {
			return fail(401, {
				form,
				message: 'Unauthorized'
			});
		}

		try {
			const name = form.data.name;

			if (!name) {
				return fail(400, {
					form,
					message: 'Missing required fields'
				});
			}

			const { data: dataTeamExists } = await locals.supabase
				.from('team_settings')
				.select('id')
				.eq('profile_id', user.id)
				.eq('name', name)
				.maybeSingle();

			if (dataTeamExists) {
				return fail(400, {
					form,
					message: 'Team already exists'
				});
			}

			const { data, error: teamError } = await locals.supabase
				.from('team_settings')
				.insert({
					name: name,
					profile_id: user.id,
					created_at: new Date(),
					updated_at: new Date()
				})
				.select('id, name, updated_at')
				.single();

			if (teamError) throw teamError;

			return {
				success: true,
				id: data.id,
				name: data.name,
				updated_at: data.updated_at,
				form
			};
		} catch (error) {
			console.error('Create team settings error:', error);
			return fail(500, {
				form,
				message: 'Failed to create team settings'
			});
		}
	}
};
