import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import type { Actions } from './$types';
import { eventTypesCreateSchemaValidator } from '$lib/validators/eventTypesCreateSchemaValidator';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, eventTypesCreateSchemaValidator);

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
			//const id = form.data.id;
			const title = form.data.title;
			const color = form.data.color;
			const collaborators = form.data.collaborators;

			if (!title || !color || !collaborators) {
				return fail(400, {
					form,
					message: 'Missing required fields'
				});
			}

			const { data: membersData } = await locals.supabase
				.from('event_types')
				.select('id, title, color, collaborators')
				.eq('title', title)
				.single();

			if (membersData) {
				return fail(400, {
					form,
					message: 'Event type already exists'
				});
			}

			const { data, error } = await locals.supabase
				.from('event_types')
				.insert({
					title: title,
					color: color,
					collaborators: collaborators,
					created_at: new Date(),
					updated_at: new Date()
				})
				.select('id, title, color, collaborators, created_at, updated_at')
				.single();

			if (error) {
				return fail(500, {
					form,
					message: 'Failed to create event type'
				});
			}

			return {
				success: true,
				id: data.id,
				title: data.title,
				color: data.color,
				collaborators: data.collaborators,
				created_at: data.created_at,
				updated_at: data.updated_at,
				form
			};
		} catch (error) {
			console.error('Create event type error:', error);
			return fail(500, {
				form,
				message: 'Failed to create event type'
			});
		}
	}
};
