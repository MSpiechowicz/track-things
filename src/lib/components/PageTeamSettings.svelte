<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { timer } from '$lib/utils/progressTimer.svelte';
	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageProgressBar from './PageProgressBar.svelte';
	import PageTeamSettingsMemberList from './PageTeamSettingsMemberList.svelte';
	import PageTeamSettingsOwnerList from './PageTeamSettingsOwnerList.svelte';
	import PageTeamSettingsUpdate from './PageTeamSettingsUpdate.svelte';
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TEAM_SETTINGS}>
	{#if timer.isNotFinished}
		<div class="mt-24">
			<PageProgressBar />
		</div>
	{/if}
	{#if timer.isFinished}
		{#if teamSettingsOwnerStore.showUpdateView}
			<PageTeamSettingsUpdate />
		{:else}
			<PageTeamSettingsOwnerList />
			<PageTeamSettingsMemberList />
		{/if}
	{/if}
</DashboardContainer>
