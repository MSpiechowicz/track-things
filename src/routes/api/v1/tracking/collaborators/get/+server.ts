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
			.from('tracking_collaborators')
			.select('emails')
			.eq('tracking_id', trackingId);

		if (trackingError) throw trackingError;

		return new Response(JSON.stringify({ collaborators: data }), { status: 200 });
	} catch (error) {
		console.error('Get tracking collaborators error:', error);
		return new Response(JSON.stringify({ error: 'Failed to get tracking collaborators' }), { status: 500 });
	}
};
