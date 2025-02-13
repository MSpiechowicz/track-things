export const POST = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const projectId = url.searchParams.get('projectId');
		const email = url.searchParams.get('email');

		if (!projectId || !email) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { error: projectError } = await locals.supabase
			.from('project_collaborators')
			.update({
				emails: {
					set: (existing: string[]) => {
						return (existing || []).filter((e) => e !== email);
					}
				},
				updated_at: new Date()
			})
			.eq('project_id', projectId)
			.eq('profile_id', user.id);

		if (projectError) throw projectError;

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Delete project collaborator error:', error);
		return new Response(JSON.stringify({ error: 'Failed to delete project collaborator' }), { status: 500 });
	}
};
