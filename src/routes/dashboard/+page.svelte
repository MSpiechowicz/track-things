<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { timer } from '$lib/utils/timer.svelte.js';

	import PageDashboardProjects from '$lib/components/PageDashboardProjects.svelte';
	import PageProgressBar from '$lib/components/PageProgressBar.svelte';
	import PageTeamSettings from '$lib/components/PageTeamSettings.svelte';
	import PageTeamSettingsCreate from '$lib/components/PageTeamSettingsCreate.svelte';

	import IconDataBricks from '$lib/components/svg/IconDataBricks.svelte';
	import IconUserGroup from '$lib/components/svg/IconUserGroup.svelte';

	const { data } = $props();
	const { userProfile } = $derived(data);

	$effect(() => {
		if (!userProfile || !userProfile.id) {
			goto('/auth/login');
		}
	});
</script>

{#if timer.isNotFinished}
	<PageProgressBar />
{/if}

{#if timer.isFinished}
	<div class="flex flex-1 gap-8">
		<div class="w-[20%] min-w-[250px]">
			<div class="flex flex-col items-start gap-1">
				{#each [{ view: DASHBOARD_VIEWS.PROJECTS, icon: IconDataBricks }, { view: DASHBOARD_VIEWS.TEAM_SETTINGS, icon: IconUserGroup }] as { view, icon: Icon }}
					<Button
						variant="ghost"
						class={`flex w-[200px] justify-start text-white hover:text-black [&_svg]:stroke-white hover:[&_svg]:stroke-black
							${dashboardStore.currentView.startsWith(view) ? 'bg-white text-black [&_svg]:stroke-black' : ''}`}
						onclick={() => (dashboardStore.currentView = view)}
					>
						<Icon additionalClass="h-5 w-5" />
						<span class="text-lg font-medium">{view}</span>
					</Button>
				{/each}
			</div>
		</div>
		{#if dashboardStore.currentView === DASHBOARD_VIEWS.PROJECTS}
			<PageDashboardProjects />
		{/if}
		{#if dashboardStore.currentView === DASHBOARD_VIEWS.TEAM_SETTINGS}
			<PageTeamSettings />
		{/if}
		{#if dashboardStore.currentView === DASHBOARD_VIEWS.TEAM_SETTINGS_CREATE}
			<PageTeamSettingsCreate />
		{/if}
	</div>
{/if}
