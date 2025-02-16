<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { teamSettingsStore } from '$lib/stores/teamSettingsStore.svelte';
	import { timer } from '$lib/utils/progressTimer.svelte';

	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageProgressBar from './PageProgressBar.svelte';
	import PageTeamSettingsCreate from './PageTeamSettingsCreate.svelte';
	import PageTeamSettingsMemberList from './PageTeamSettingsMemberList.svelte';
	import PageTeamSettingsOwnerList from './PageTeamSettingsOwnerList.svelte';
	import PageTeamSettingsUpdate from './PageTeamSettingsUpdate.svelte';

	async function loadTeamSettings() {
		const responseTeamSettings = await fetch('/api/v1/team-settings/get/all');

		if (!responseTeamSettings.ok) {
			throw new Error('Failed to fetch team settings');
		}

		try {
			const resultTeamSettings = await responseTeamSettings.json();

			teamSettingsStore.data = resultTeamSettings.data;

			for (const teamSetting of teamSettingsStore.data) {
				const responseTeamMembers = await fetch(
					`/api/v1/team-members/get/all?teamId=${teamSetting.id}`
				);

				if (!responseTeamMembers.ok) {
					throw new Error(`Failed to fetch team members for the team ${teamSetting.id}`);
				}

				const resultTeamMembers = await responseTeamMembers.json();

				if (resultTeamMembers.data) {
					teamSetting.members = resultTeamMembers.data;
				}
			}
		} catch (error) {
			console.error('Error loading team settings:', error);
		}
	}

	let teamSettings = $derived(teamSettingsStore.data);

	$effect.pre(() => {
		loadTeamSettings();
	});

	$effect(() => {
		timer.reset();
	});
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TEAM_SETTINGS}>
	{#if timer.isNotFinished}
		<div class="mt-24">
			<PageProgressBar />
		</div>
	{/if}
	{#if timer.isFinished}
		{#if teamSettingsStore.showUpdateView}
			<PageTeamSettingsUpdate />
		{:else if teamSettings.length === 0 || teamSettingsStore.showCreateView}
			<PageTeamSettingsCreate />
		{:else}
			<PageTeamSettingsOwnerList />
			<PageTeamSettingsMemberList />
		{/if}
	{/if}
</DashboardContainer>
