export const POST = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		const url = new URL(request.url);
		const trackingId = url.searchParams.get('trackingId');
		const email = url.searchParams.get('email');

		if (!trackingId || !email) {
			return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
		}

		const { error: trackingError } = await locals.supabase
			.from('tracking_collaborators')
			.update({
				emails: {
					set: (existing: string[]) => {
						if (existing?.includes(email)) {
							return existing;
						}
						return [...(existing || []), email];
					}
				},
				updated_at: new Date()
			})
			.eq('tracking_id', trackingId)
			.eq('profile_id', user.id);

		if (trackingError) throw trackingError;

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Update tracking collaborator error:', error);
		return new Response(JSON.stringify({ error: 'Failed to update tracking collaborator' }), { status: 500 });
	}
};
