<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageNavigation from '$lib/components/PageNavigation.svelte';
	import PageSeparator from '$lib/components/PageSeparator.svelte';
	import '../app.css';

	const { data: propsData, children } = $props();
	const { supabase, session, userProfile } = propsData;

	//const { userProfile } = propsData;

	$effect(() => {
		const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<PageSeparator />

<div class="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 xl:px-0">
	<PageNavigation id={userProfile?.id} displayName={userProfile?.name} />
	{@render children()}
</div>
