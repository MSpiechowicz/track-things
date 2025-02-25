<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { teamSettingsTimer } from '$lib/utils/timers/defaults';
	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageSpinner from './PageSpinner.svelte';
	import PageTeamSettingsMemberList from './PageTeamSettingsMemberList.svelte';
	import PageTeamSettingsOwnerList from './PageTeamSettingsOwnerList.svelte';
	import PageTeamSettingsUpdate from './PageTeamSettingsUpdate.svelte';

  $effect(() => {
    teamSettingsTimer.start();
    teamSettingsOwnerStore.resetViews();
    dashboardStore.resetViews();
  });
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TEAM_SETTINGS}>
	{#if teamSettingsTimer.isRunning}
		<div class="mt-8">
			<PageSpinner additionalClass="w-10 h-10" />
		</div>
	{/if}
	{#if teamSettingsTimer.isFinished}
		{#if teamSettingsOwnerStore.showUpdateView}
			<PageTeamSettingsUpdate />
		{:else}
			<PageTeamSettingsOwnerList />
			<PageTeamSettingsMemberList />
		{/if}
	{/if}
</DashboardContainer>
