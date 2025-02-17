export const GET = async ({ locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const response = await locals.supabase.functions.invoke('user-get-team-settings-member', {
			method: 'POST',
			body: JSON.stringify({ email: user.email })
		});

		if (response.error) {
			throw response.error;
		}

		const data = response.data?.length > 0 ? [...response.data] : [];

		return new Response(JSON.stringify({ data: data }), { status: 200 });
	} catch (error) {
		console.error('Get all team settings member error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get all team settings member' }), { status: 500 });
	}
};
