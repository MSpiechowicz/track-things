<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { teamSettingsStore } from '$lib/stores/teamSettings.svelte';
	import { timer } from '$lib/utils/timer.svelte';

	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageProgressBar from './PageProgressBar.svelte';
	import PageTeamSettingsCreate from './PageTeamSettingsCreate.svelte';
	import PageTeamSettingsList from './PageTeamSettingsList.svelte';

	async function loadTeamSettings() {
		try {
			const response = await fetch('/api/v1/team-settings/get/all');
			if (!response.ok) throw new Error('Failed to fetch team settings');
			const data = await response.json();
			teamSettingsStore.data = data.teamSettings;
		} catch (error) {
			console.error('Error loading team settings:', error);
			// You might want to add proper error handling here
		}
	}

	$effect(() => {
		timer.reset();
		loadTeamSettings();
	});
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TEAM_SETTINGS}>
	{#if timer.isNotFinished}
		<div class="mt-24">
			<PageProgressBar />
		</div>
	{/if}
	{#if timer.isFinished && teamSettingsStore.data.length === 0}
		<PageTeamSettingsCreate />
	{/if}
	{#if timer.isFinished && teamSettingsStore.data.length > 0}
		<PageTeamSettingsList />
	{/if}
</DashboardContainer>
