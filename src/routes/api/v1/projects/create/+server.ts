export const POST = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const name = url.searchParams.get('name');
		const type = url.searchParams.get('type');

		if (!name || !type) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { error: projectError } = await locals.supabase
			.from('projects')
			.insert({
				name,
				type,
				profileId: user.id,
				createdAt: new Date(),
				updatedAt: new Date()
			});

		if (projectError) throw projectError;

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Create project error:', error);
		return new Response(JSON.stringify({ error: 'Failed to create project' }), { status: 500 });
	}
};
