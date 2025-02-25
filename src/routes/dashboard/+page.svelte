<script lang="ts">
	import { goto } from '$app/navigation';
	import PageTeamSettings from '$lib/components/PageTeamSettings.svelte';
	import PageTracking from '$lib/components/PageTracking.svelte';
	import IconEye from '$lib/components/svg/IconEye.svelte';
	import IconUserGroup from '$lib/components/svg/IconUserGroup.svelte';
	import { Button } from '$lib/components/ui/button';
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';

	const { data } = $props();
	const { userProfile } = $derived(data);

	$effect(() => {
		if (!userProfile || !userProfile.id) {
			goto('/auth/login');
		}
	});
</script>

<div class="flex flex-col xl:flex-row flex-1 gap-8">
	<div class="md:w-[20%] md:min-w-[250px]">
		<div class="flex xl:flex-col items-center md:items-start gap-1">
			{#each [{ view: DASHBOARD_VIEWS.TRACKING, icon: IconEye }, { view: DASHBOARD_VIEWS.TEAM_SETTINGS, icon: IconUserGroup }] as { view, icon: Icon }}
				<Button
					variant="ghost"
					class={`flex justify-center md:justify-start md:w-[200px] text-white hover:text-black [&_svg]:stroke-white hover:[&_svg]:stroke-black
							${dashboardStore.currentView.startsWith(view) ? 'bg-white text-black [&_svg]:stroke-black' : ''}`}
					onclick={() => dashboardStore.setCurrentView(view)}
				>
					<Icon additionalClass="h-5 w-5" />
					<span class="hidden md:inline text-lg font-medium">{view}</span>
				</Button>
			{/each}
		</div>
	</div>
	{#if dashboardStore.currentView === DASHBOARD_VIEWS.TRACKING}
		<PageTracking />
	{/if}
	{#if dashboardStore.currentView === DASHBOARD_VIEWS.TEAM_SETTINGS}
		<PageTeamSettings />
	{/if}
</div>
