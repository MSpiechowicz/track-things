<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { trackingStore } from '$lib/stores/trackingStore.svelte';
	import { trackingTimer } from '$lib/utils/timers/defaults';
	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageSpinner from './PageSpinner.svelte';
	import PageTrackingCreate from './PageTrackingCreate.svelte';
	import PageTrackingList from './PageTrackingList.svelte';

	$effect(() => {
		trackingTimer.start();
		trackingStore.resetViews();
		dashboardStore.resetViews();
	});
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TRACKING}>
	{#if trackingTimer.isRunning}
		<div class="mt-8">
			<PageSpinner additionalClass="w-10 h-10" />
		</div>
	{/if}
	{#if trackingTimer.isFinished}
		{#if trackingStore.showCreateView}
			<PageTrackingCreate />
		{:else}
			<PageTrackingList />
		{/if}
	{/if}
</DashboardContainer>
