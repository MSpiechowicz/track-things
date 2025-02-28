export const GET = async ({ locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const { data: eventTypesData, error: eventTypesError } = await locals.supabase
			.from('event_types')
			.select('id, title, color, created_at, updated_at')
			.order('created_at', { ascending: false });

		if (eventTypesError) {
			throw eventTypesError;
		}

		const eventTypes = eventTypesData.map(async (eventType) => {
			const { data: eventTypeTeamsData, error: eventTypeTeamsDataError } = await locals.supabase
				.from('event_type_teams')
				.select('id, event_type_id, team_id, team_name, created_at, updated_at')
				.eq('event_type_id', eventType.id)
				.order('created_at', { ascending: false });

			if (eventTypeTeamsDataError) {
				throw eventTypeTeamsDataError;
			}

			return {
				id: eventType.id,
				title: eventType.title,
				color: eventType.color,
				created_at: eventType.created_at,
				updated_at: eventType.updated_at,
				teams: eventTypeTeamsData
			};
		});

		console.log('server data', await Promise.all(eventTypes));

		return new Response(
			JSON.stringify({
				success: true,
				data: await Promise.all(eventTypes)
			}),
			{ status: 200 }
		);
	} catch (error) {
		console.error('Get all team members error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get all team members' }), {
			status: 500
		});
	}
};
