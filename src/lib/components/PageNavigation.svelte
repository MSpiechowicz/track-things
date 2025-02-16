<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { userStore } from '$lib/stores/userStore.svelte';
	import { timer } from '$lib/utils/countdownTimer.svelte';

	import PageSpinner from '$lib/components/PageSpinner.svelte';
	import PageUserMenu from '$lib/components/PageUserMenu.svelte';
	import IconFoots from './svg/IconFoots.svelte';

	$effect(() => {
		timer.start();
	});
</script>

<nav class="flex h-[96px] items-center justify-between border-b border-white/15 md:px-8">
	<a
		href={userStore.id ? '/dashboard' : '/'}
		data-sveltekit-reload
		class="flex flex-shrink-0 cursor-pointer items-center hover:no-underline"
	>
		<div class="flex text-3xl font-bold sm:hidden">
			<span class="text-white">t</span>
			<div class="flex items-center justify-center">
				<IconFoots />
			</div>
			<span class="text-blue-600">t</span>
		</div>
		<div class="hidden text-3xl font-bold sm:flex">
			<span class="text-white">track</span>
			<div class="flex items-center justify-center">
				<IconFoots additionalClass="h-auto w-auto" />
			</div>
			<span class="text-blue-600">things</span>
		</div>
		<span class="ml-2 rounded-full bg-gray-200 px-2 py-1 text-xs text-gray-700">ALPHA</span>
	</a>
	{#if timer.isRunning}
		<PageSpinner />
	{/if}
	{#if timer.isFinished && userStore.id}
		<div class="flex items-center gap-2 text-white">
			<Button
				variant="link"
				href="/dashboard"
				data-sveltekit-reload
				class="text-white"
				aria-label="Go to dashboard">Dashboard</Button
			>
			<div class="hidden sm:block">
				<PageUserMenu />
			</div>
			<div class="sm:hidden">
				<PageUserMenu isMobile={true} />
			</div>
		</div>
	{/if}
	{#if timer.isFinished && !userStore.id}
		<Button variant="default" href="/auth/login" aria-label="Sign in to your account"
			>Sign In</Button
		>
	{/if}
</nav>
