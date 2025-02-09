export const POST = async ({ request, locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	const url = new URL(request.url);

	const displayName = url?.searchParams?.get('displayName');
	const hideEmail = url?.searchParams?.get('hideEmail');

	const profile = await locals.supabase.from('profiles').select().match({ id: user.id }).single();

	if (profile.error) {
		return new Response(JSON.stringify({ error: profile.error.message }), { status: 500 });
	}

	const existingSettings = await locals.supabase
		.from('profile_settings')
		.select('id')
		.eq('profile_id', user.id)
		.maybeSingle();

	const upsertData = {
		profile_id: user.id,
		display_name: displayName,
		hide_email: hideEmail === 'true',
		...(existingSettings.data
			? {
					updated_at: new Date().toISOString(),
					id: existingSettings.data.id
				}
			: {
					created_at: new Date().toISOString(),
					updated_at: new Date().toISOString()
				})
	};

	const result = await locals.supabase.from('profile_settings').upsert(upsertData, {
		onConflict: 'id',
		ignoreDuplicates: false
	});

	if (result.error) {
		return new Response(JSON.stringify({ error: result.error.message }), { status: 500 });
	}

	return new Response(JSON.stringify(profile.data), { status: 200 });
};
