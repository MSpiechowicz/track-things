import { eventTypesUpdateSchemaValidator } from '$lib/validators/eventTypesUpdateSchemaValidator';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, eventTypesUpdateSchemaValidator);

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
			const id = form.data.id;
			const title = form.data.title;
			const color = form.data.color;
			const teams = form.data.teams || [];

			if (!title || !color || !id) {
				return fail(400, {
					form,
					message: 'Missing required fields'
				});
			}

			const { data: updateData, error: eventTypeError } = await locals.supabase
				.from('event_types')
				.update({
					title: title,
					color: color,
					updated_at: new Date()
				})
				.eq('id', id)
				.select('id, title, color, created_at, updated_at')
				.single();

			if (eventTypeError) {
				return fail(500, {
					form,
					message: 'Failed to update event type'
				});
			}

			// First, delete all existing team associations
			const { error: deleteError } = await locals.supabase
				.from('event_type_teams')
				.delete()
				.eq('event_type_id', updateData.id);

			if (deleteError) {
				return fail(500, {
					form,
					message: 'Failed to update team associations'
				});
			}

			// Then insert new team associations
			if (teams.length > 0) {
				const { error: insertError } = await locals.supabase.from('event_type_teams').insert(
					teams.map((team) => ({
						event_type_id: updateData.id,
						team_id: team.id,
						team_name: team.team_name,
						created_at: new Date(),
						updated_at: new Date()
					}))
				);

				if (insertError) {
					return fail(500, {
						form,
						message: 'Failed to create team associations'
					});
				}
			}

			return {
				success: true,
				id: updateData.id,
				title: updateData.title,
				color: updateData.color,
				teams: teams,
				created_at: updateData.created_at,
				updated_at: updateData.updated_at,
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
