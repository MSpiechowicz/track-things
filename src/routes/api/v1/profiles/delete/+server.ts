export const POST = async ({ locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		// TODO: check against example https://blog.mansueli.com/supabase-user-self-deletion-empower-users-with-edge-functions
		const { error: deleteError } = await locals.supabase.functions.invoke('user-self-deletion');

		if (deleteError) throw deleteError;

		const { error: profileError } = await locals.supabase
			.from('profiles')
			.delete()
			.eq('id', user.id);

		if (profileError) throw profileError;

		await locals.supabase.auth.signOut();

		return new Response(JSON.stringify({ success: true }), { status: 200 });
	} catch (error) {
		console.error('Delete account error:', error);
		return new Response(JSON.stringify({ error: 'Failed to delete account' }), { status: 500 });
	}
};
