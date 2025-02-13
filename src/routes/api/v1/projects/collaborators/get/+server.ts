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

		const { data, error: projectError } = await locals.supabase
			.from('project_collaborators')
			.select('emails')
			.eq('project_id', projectId);

		if (projectError) throw projectError;

		return new Response(JSON.stringify({ collaborators: data }), { status: 200 });
	} catch (error) {
		console.error('Get project collaborators error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get project collaborators' }), { status: 500 });
	}
};
