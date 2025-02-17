export const POST = async ({ request, locals }) => {
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

		const { error: trackingError } = await locals.supabase
			.from('tracking')
			.delete()
			.eq('id', trackingId)
			.eq('profileId', user.id);

		if (trackingError) throw trackingError;

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Delete tracking error:', error);
		return new Response(JSON.stringify({ error: 'Failed to delete tracking' }), { status: 500 });
	}
};
