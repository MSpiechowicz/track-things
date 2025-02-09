export const POST = async ({ locals }) => {
	const { user } = await locals.safeGetUser();

	if (!user) {
		return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
	}

	try {
		// TODO: delete user with the admin api without exposing the SUPABASE_SERVICE_ROLE_KEY
		//const { error: authError } = await locals.supabase.auth.admin.deleteUser(user.id);
		//if (authError) throw authError;

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
