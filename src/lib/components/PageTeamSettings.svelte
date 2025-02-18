<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { timer } from '$lib/utils/progressTimer.svelte';

	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageProgressBar from './PageProgressBar.svelte';
	import PageTeamSettingsMemberList from './PageTeamSettingsMemberList.svelte';
	import PageTeamSettingsOwnerList from './PageTeamSettingsOwnerList.svelte';
	import PageTeamSettingsUpdate from './PageTeamSettingsUpdate.svelte';

	//async function loadTeamSettings() {
	//	const responseTeamSettings = await fetch('/api/v1/team-settings/get/all');

	//	if (!responseTeamSettings.ok) {
	//		throw new Error('Failed to fetch team settings');
	//	}

	//	try {
	//		const resultTeamSettings = await responseTeamSettings.json();

	//		teamSettingsOwnerStore.data = resultTeamSettings.data;

	//		for (const teamSetting of teamSettingsOwnerStore.data) {
	//			const responseTeamMembers = await fetch(
	//				`/api/v1/team-members/get/all?teamId=${teamSetting.id}`
	//			);

	//			if (!responseTeamMembers.ok) {
	//				throw new Error(`Failed to fetch team members for the team ${teamSetting.id}`);
	//			}

	//			const resultTeamMembers = await responseTeamMembers.json();

	//			if (resultTeamMembers.data) {
	//				teamSetting.members = resultTeamMembers.data;
	//			}
	//		}
	//	} catch (error) {
	//		console.error('Error loading team settings:', error);
	//	}
	//}

  //async function fetchData() {
	//	const response = await fetch(`/api/v1/team-settings/member/get/all`);

	//	if (!response.ok) {
	//		throw new Error('Unable to fetch the user member team settings');
	//	}

	//	const result = await response.json();

  //  console.log(result);

	//	teamSettingsMemberStore.data = result.data;

  //  console.log(teamSettingsMemberStore.data);
	//}

  //async function init() {
  //      try {
  //          await Promise.all([
  //              fetchData(),
  //              loadTeamSettings()
  //          ]);
  //      } catch (error) {
  //          console.error('Error loading data:', error);
  //      } finally {
  //          timer.reset();
  //      }
  //  }

  //  $effect(() => {
  //      init();
  //  });

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
