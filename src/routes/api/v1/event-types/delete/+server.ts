export const DELETE = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
    const id = url.searchParams.get('id');

		if (!id) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { error: eventTypeError } = await locals.supabase
			.from('event_types')
			.delete()
			.eq('id', id);

		if (eventTypeError) {
			throw eventTypeError;
		}

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Delete event type error:', error);
		return new Response(JSON.stringify({ error: 'Failed to delete event type' }), { status: 500 });
	}
};
