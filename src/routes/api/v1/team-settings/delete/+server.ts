export const POST = async ({ locals, request }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url)
    const id = url.searchParams.get('id');

		if (!id) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { error: teamSettingsError } = await locals.supabase
			.from('team_settings')
			.delete()
			.eq('id', id);

		if (teamSettingsError) throw teamSettingsError;

		return new Response(JSON.stringify({ message: 'Team settings deleted successfully' }), { status: 200 });
	} catch (error) {
		console.error('Delete team settings error:', error);
		return new Response(JSON.stringify({ error: 'Failed to delete team settings' }), { status: 500 });
	}
};
