import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import type { Actions, PageServerLoad } from './$types';

const formSchema = z.object({
	name: z.string().min(3, 'This field is required, and must be at least 3 characters long')
});

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, zod(formSchema));

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

			const { data, error: teamError } = await locals.supabase
				.from('team_settings')
				.insert({
					name: name,
					profile_id: user.id,
					created_at: new Date(),
					updated_at: new Date()
				})
				.select('id')
				.single();

			if (teamError) throw teamError;

			return {
				success: true,
				id: data.id,
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
