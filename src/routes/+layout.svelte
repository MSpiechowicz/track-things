<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { Toaster } from '$lib/components/ui/sonner';
	import { userStore } from '$lib/stores/userStore.svelte';
	import PageFooter from '$lib/components/PageFooter.svelte';
	import PageNavigation from '$lib/components/PageNavigation.svelte';
	import PageSeparator from '$lib/components/PageSeparator.svelte';
	import PageTransition from '$lib/components/PageTransition.svelte';
	import { page } from '$app/state';
	import '../app.css';

	const { data, children } = $props();
	const { supabase, userProfile } = $derived(data);

	$effect(() => {
		userStore.id = userProfile?.id;
		userStore.email = userProfile?.email;
		userStore.displayName = userProfile?.displayName;
		userStore.hideEmail = userProfile?.hideEmail;

		const { data } = supabase.auth.onAuthStateChange(async (event) => {
			if (event === 'SIGNED_IN' || event === 'SIGNED_OUT') {
				// Verify the user's authentication status
				const {
					data: { user }
				} = await supabase.auth.getUser();

				if (user?.id !== userProfile?.id || !userProfile || !user) {
					invalidate('supabase:auth');
				}
			}
		});

		return () => data.subscription.unsubscribe();
	});
</script>

<PageSeparator />

<div class="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 xl:px-0">
  <PageNavigation />
	<main class="flex flex-1 flex-col items-center justify-center py-8 text-white md:px-8">
		<PageTransition pathname={page.url.pathname}>
			{@render children()}
		</PageTransition>
	</main>
	<PageFooter />
	<Toaster />
</div>
