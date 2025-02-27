<script lang="ts">
	import { goto } from '$app/navigation';
	import PageTeamSettings from '$lib/components/PageTeamSettings.svelte';
	import PageEventTypes from '$lib/components/PageEventTypes.svelte';
	import PageTracking from '$lib/components/PageTracking.svelte';
	import IconEye from '$lib/components/svg/IconEye.svelte';
	import IconUserGroup from '$lib/components/svg/IconUserGroup.svelte';
	import IconCalendarClock from '$lib/components/svg/IconCalendarClock.svelte';
	import { Button } from '$lib/components/ui/button';
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';

	const { data } = $props();
	const { userProfile } = $derived(data);

	const views = [
		{ view: DASHBOARD_VIEWS.TRACKING, icon: IconEye },
		{ view: DASHBOARD_VIEWS.EVENT_TYPES, icon: IconCalendarClock },
		{ view: DASHBOARD_VIEWS.TEAM_SETTINGS, icon: IconUserGroup }
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
			{#each views as { view, icon: Icon }}
				<Button
					variant="ghost"
					class={`flex justify-center text-white hover:text-black md:w-[200px] md:justify-start [&_svg]:stroke-white hover:[&_svg]:stroke-black
							${dashboardStore.currentView.startsWith(view) ? 'bg-white text-black [&_svg]:stroke-black' : ''}`}
					onclick={() => dashboardStore.setCurrentView(view)}
				>
					<Icon additionalClass="h-5 w-5" />
					<span class="hidden text-lg font-medium md:inline">{view}</span>
				</Button>
			{/each}
		</div>
	</div>
	{#if dashboardStore.currentView === DASHBOARD_VIEWS.TRACKING}
		<PageTracking />
	{/if}
	{#if dashboardStore.currentView === DASHBOARD_VIEWS.EVENT_TYPES}
		<PageEventTypes />
	{/if}
	{#if dashboardStore.currentView === DASHBOARD_VIEWS.TEAM_SETTINGS}
		<PageTeamSettings />
	{/if}
</div>
