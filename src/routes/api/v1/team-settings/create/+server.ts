export const POST = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const name = url.searchParams.get('name');

		if (!name) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
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

		return new Response(JSON.stringify({ id: data.id }), { status: 200 });
	} catch (error) {
		console.error('Create team settings error:', error);
		return new Response(JSON.stringify({ error: 'Failed to create team settings' }), { status: 500 });
	}
};
