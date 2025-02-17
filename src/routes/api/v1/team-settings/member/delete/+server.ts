export const DELETE = async ({ locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const response = await locals.supabase.functions.invoke('user-delete-team-settings-member', {
			method: 'POST',
			body: JSON.stringify({ email: user.email })
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
