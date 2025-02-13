export const GET = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const projectId = url.searchParams.get('projectId');

		if (!projectId) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { data, error: projectsError } = await locals.supabase
			.from('projects')
			.select('id, name, type, updatedAt')
			.eq('profileId', user.id)
			.eq('id', projectId);

		if (projectsError) throw projectsError;

		return new Response(JSON.stringify({ success: true, projects: data }), { status: 200 });
	} catch (error) {
		console.error('Get all projects error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get all projects' }), { status: 500 });
	}
};
