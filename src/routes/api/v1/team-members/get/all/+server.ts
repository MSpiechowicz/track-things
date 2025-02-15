export const GET = async ({ locals, request }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
    const url = new URL(request.url);
    const teamId = url.searchParams.get('teamId');

		const { data, error: membersError } = await locals.supabase
			.from('team_members')
			.select('id, email, joined_at')
			.eq('team_id', teamId)
			.order('joined_at', { ascending: false });

		if (membersError) throw membersError;

		return new Response(JSON.stringify({ success: true, members: data }), { status: 200 });
	} catch (error) {
		console.error('Get all team members error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get all team members' }), { status: 500 });
	}
};
