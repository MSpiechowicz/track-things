export const POST = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const projectId = url.searchParams.get('projectId');
		const name = url.searchParams.get('name');
		const type = url.searchParams.get('type');

		if (!name || !type || !projectId) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { error: projectError } = await locals.supabase
			.from('projects')
			.update({
				name,
				type,
				updatedAt: new Date()
			})
			.eq('id', projectId)
			.eq('profileId', user.id);

		if (projectError) throw projectError;

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Update project error:', error);
		return new Response(JSON.stringify({ error: 'Failed to update project' }), { status: 500 });
	}
};
