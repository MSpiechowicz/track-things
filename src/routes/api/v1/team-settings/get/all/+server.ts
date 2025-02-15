export const GET = async ({ locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const { data, error: teamSettingsError } = await locals.supabase
			.from('team_settings')
			.select('id, name, updated_at')
			.eq('profile_id', user.id)
			.order('updated_at', { ascending: false });

		if (teamSettingsError) {
			throw teamSettingsError;
		}

		return new Response(JSON.stringify({ data }), { status: 200 });
	} catch (error) {
		console.error('Get all projects error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get all projects' }), { status: 500 });
	}
};
