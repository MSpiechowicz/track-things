<script lang="ts">
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { trackingTimer } from '$lib/utils/timers/defaults';
	import DashboardContainer from './PageDashboardContainer.svelte';
	import PageSpinner from './PageSpinner.svelte';
	import PageTrackingList from './PageTrackingList.svelte';

  $effect(() => {
    trackingTimer.start();
  });
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TRACKING}>
  {#if trackingTimer.isRunning}
		<div class="mt-8">
			<PageSpinner additionalClass="w-10 h-10" />
		</div>
	{/if}
	{#if trackingTimer.isFinished}
		<PageTrackingList />
	{/if}
</DashboardContainer>
