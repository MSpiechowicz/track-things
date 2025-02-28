import { eventTypesCreateSchemaValidator } from '$lib/validators/eventTypesCreateSchemaValidator';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/client';
import type { Actions } from './$types';

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
			const title = form.data.title;
			const color = form.data.color;
			const teams = form.data.teams || [];

			if (!title || !color) {
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

			const { data: eventTypesData, error: eventTypesError } = await locals.supabase
				.from('event_types')
				.insert({
					title: title,
					color: color,
					created_at: new Date(),
					updated_at: new Date()
				})
				.select('id, title, color, created_at, updated_at')
				.single();

			if (eventTypesError) {
				return fail(500, {
					form,
					message: 'Failed to create event type'
				});
			}

			for (const team of teams) {
				const { data: eventTypeTeamData, error: eventTypeTeamError } = await locals.supabase
					.from('event_type_teams')
					.insert({
						event_type_id: eventTypesData.id,
						team_id: team.team_id,
						team_name: team.team_name,
						created_at: new Date(),
						updated_at: new Date()
					});

				if (eventTypeTeamError) {
					return fail(500, {
						form,
						message: 'Failed to create event type team'
					});
				}

				if (eventTypeTeamData) {
					teams.push(eventTypeTeamData);
				}
			}

			return {
				success: true,
				id: eventTypesData.id,
				title: eventTypesData.title,
				color: eventTypesData.color,
				teams: teams,
				created_at: eventTypesData.created_at,
				updated_at: eventTypesData.updated_at,
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
