export const GET = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const trackingId = url.searchParams.get('trackingId');

		if (!trackingId) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { data, error: trackingError } = await locals.supabase
			.from('tracking')
			.select('id, name, type, updatedAt')
			.eq('profileId', user.id)
			.eq('id', trackingId);

		if (trackingError) throw trackingError;

		return new Response(JSON.stringify({ success: true, tracking: data }), { status: 200 });
	} catch (error) {
		console.error('Get tracking error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get tracking' }), { status: 500 });
	}
};
