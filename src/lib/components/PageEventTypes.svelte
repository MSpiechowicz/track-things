<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
	import { eventTypesTimer } from '$lib/utils/timers/defaults';
	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageEventTypesCreate from './PageEventTypesCreate.svelte';
	import PageEventTypesList from './PageEventTypesList.svelte';
	import PageEventTypesUpdate from './PageEventTypesUpdate.svelte';
	import PageSpinner from './PageSpinner.svelte';

  $effect(() => {
    eventTypesTimer.start();
    eventTypesStore.resetViews();
    dashboardStore.resetViews();
  });
</script>

<DashboardContainer title={DASHBOARD_VIEWS.EVENT_TYPES}>
	{#if eventTypesTimer.isRunning}
		<div class="mt-8">
			<PageSpinner additionalClass="w-10 h-10" />
		</div>
	{/if}
	{#if eventTypesTimer.isFinished}
		{#if eventTypesStore.showCreateView}
			<PageEventTypesCreate />
    {:else if eventTypesStore.showUpdateView}
      <PageEventTypesUpdate />
    {:else}
			<PageEventTypesList />
		{/if}
	{/if}
</DashboardContainer>
