import { teamSettingsUpdateSchemaValidator } from '$lib/validators/teamSettingsUpdateSchemaValidator';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, teamSettingsUpdateSchemaValidator);

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
			const id = form.data.id;

			if (!name || !id) {
				return fail(400, {
					form,
					message: 'Missing required fields'
				});
			}

			const { data: existingTeam } = await locals.supabase
				.from('team_settings')
				.select('id')
				.eq('profile_id', user.id)
				.eq('name', name)
				.single();

			if (existingTeam) {
				return fail(400, {
					form,
					message: 'A team with this name already exists'
				});
			}

			const { data, error: teamError } = await locals.supabase
				.from('team_settings')
				.update({
					name: name,
					updated_at: new Date()
				})
				.eq('id', id)
				.select('id, name, updated_at, created_at, members, tracking_ids')
				.single();

			if (teamError) {
				throw teamError;
			}

			return {
				success: true,
				id: data.id,
				name: data.name,
				created_at: data.created_at,
				updated_at: data.updated_at,
				members: data.members,
				tracking_ids: data.tracking_ids,
				form
			};
		} catch (error) {
			console.error('Update team settings error:', error);
			return fail(500, {
				form,
				message: 'Failed to update team settings'
			});
		}
	}
};
