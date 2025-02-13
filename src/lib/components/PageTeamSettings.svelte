<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { teamStore } from '$lib/stores/teamStore.svelte';

	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageTeamSettingsCreate from './PageTeamSettingsCreate.svelte';
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TEAM_SETTINGS}>
	{#if !teamStore.id}
		<PageTeamSettingsCreate />
	{/if}
</DashboardContainer>
