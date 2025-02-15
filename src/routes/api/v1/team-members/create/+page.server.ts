import { teamMembersCreateSchemaValidator } from '$lib/validators/teamMembersCreateSchemaValidator';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, teamMembersCreateSchemaValidator);

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
			const teamId = form.data.teamId;
			const email = form.data.email;

			if (!email || !teamId) {
				return fail(400, {
					form,
					message: 'Missing required fields'
				});
			}

			const { data: membersData } = await locals.supabase
				.from('team_members')
				.select('id, email')
				.eq('email', email)
				.eq('team_id', teamId)
				.single();

			if (membersData) {
				return fail(400, {
					form,
					message: 'Email already exists'
				});
			}

      const response = await locals.supabase.functions.invoke('user-get-name', {
        method: 'POST',
        body: JSON.stringify({ email })
      });

      if (!response || !response.data) {
        return fail(500, {
          form,
          message: 'Failed to get user'
        });
      }

			const { data, error: teamError } = await locals.supabase
				.from('team_members')
				.insert({
					email: email,
          name: response.data.name,
					team_id: teamId,
					profile_id: user.id,
          permissions: 'Edit',
					created_at: new Date()
				})
				.select('id, email, created_at')
				.single();

			if (teamError) {
				return fail(500, {
					form,
					message: 'Failed to create team member'
				});
			}

			return {
				success: true,
				id: data.id,
        name: response.data.name,
				email: data.email,
				created_at: data.created_at,
				form
			};
		} catch (error) {
			console.error('Create team member error:', error);
			return fail(500, {
				form,
				message: 'Failed to create team member'
			});
		}
	}
};
