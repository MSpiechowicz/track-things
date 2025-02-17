export const DELETE = async ({ locals, request }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const email = url.searchParams.get('email');

		if (!email) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const response = await locals.supabase.functions.invoke('user-delete-team-settings-member', {
			method: 'POST',
			body: JSON.stringify({ email })
		});

		if (response.error) {
			throw response.error;
		}

		return new Response(JSON.stringify({ message: response.data.message }), { status: 200 });
	} catch (error) {
		console.error('Delete team member error:', error);
		return new Response(JSON.stringify({ error: 'Failed to delete team member' }), { status: 500 });
	}
};
