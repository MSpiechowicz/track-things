export const DELETE = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const email = url.searchParams.get('email');
    const teamId = url.searchParams.get('teamId');

		if (!email) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { error: teamMemberError } = await locals.supabase
			.from('team_members')
			.delete()
			.eq('email', email)
			.eq('team_id', teamId);

		if (teamMemberError) throw teamMemberError;

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Delete team member error:', error);
		return new Response(JSON.stringify({ error: 'Failed to delete team member' }), { status: 500 });
	}
};
