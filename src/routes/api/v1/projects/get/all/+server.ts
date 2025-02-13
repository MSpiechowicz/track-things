export const GET = async ({ locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const { data, error: projectsError } = await locals.supabase
			.from('projects')
			.select('id, name, type, updatedAt')
			.eq('profileId', user.id)
			.order('updatedAt', { ascending: false });

		if (projectsError) throw projectsError;

		return new Response(JSON.stringify({ success: true, projects: data }), { status: 200 });
	} catch (error) {
		console.error('Get all projects error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get all projects' }), { status: 500 });
	}
};
