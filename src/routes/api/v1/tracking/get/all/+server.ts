export const GET = async ({ locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const { data, error: trackingError } = await locals.supabase
			.from('tracking')
			.select('id, name, type, updatedAt')
			.eq('profileId', user.id)
			.order('updatedAt', { ascending: false });

		if (trackingError) throw trackingError;

		return new Response(JSON.stringify({ success: true, tracking: data }), { status: 200 });
	} catch (error) {
		console.error('Get all tracking error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get all tracking' }), { status: 500 });
	}
};
