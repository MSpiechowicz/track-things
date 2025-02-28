<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import IconCalendarClock from '$lib/components/svg/IconCalendarClock.svelte';
	import IconEye from '$lib/components/svg/IconEye.svelte';
	import IconUserGroup from '$lib/components/svg/IconUserGroup.svelte';
	import { Button } from '$lib/components/ui/button';
	import { DASHBOARD_VIEWS } from '$lib/constants';

	const { data, children } = $props();
	const { userProfile } = $derived(data);

	const views = [
		{ view: DASHBOARD_VIEWS.TRACKING, path: '/dashboard/tracking', icon: IconEye },
		{ view: DASHBOARD_VIEWS.EVENT_TYPES, path: '/dashboard/event-types', icon: IconCalendarClock },
		{ view: DASHBOARD_VIEWS.TEAM_SETTINGS, path: '/dashboard/team-settings', icon: IconUserGroup }
	];

	$effect(() => {
		if (!userProfile || !userProfile.id) {
			goto('/auth/login');
		}
	});
</script>

<div class="flex flex-1 flex-col gap-8 xl:flex-row">
	<div class="md:w-[20%] md:min-w-[250px]">
		<div class="flex items-center gap-1 md:items-start xl:flex-col">
			{#each views as { view, path, icon: Icon }}
				<Button
					variant="ghost"
					class={`flex justify-center text-white hover:text-black md:w-[200px] md:justify-start [&_svg]:stroke-white hover:[&_svg]:stroke-black
							${$page.url.pathname === path ? 'bg-white text-black [&_svg]:stroke-black' : ''}`}
					onclick={() => goto(path, { keepFocus: true })}
				>
					<Icon additionalClass="h-5 w-5" />
					<span class="hidden text-lg font-medium md:inline">{view}</span>
				</Button>
			{/each}
		</div>
	</div>
	{@render children()}
</div>
