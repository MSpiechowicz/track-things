<script lang="ts">
	import { goto } from '$app/navigation';
	import PageDashboardProjects from '$lib/components/PageDashboardProjects.svelte';
	import PageProgressBar from '$lib/components/PageProgressBar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { timer } from '$lib/stores/timerStore.svelte';
	const { data } = $props();
	const { userProfile } = $derived(data);

	//let { progress, isFinished } = useElapsedTime(1500);

	//console.log('progress', progress);

  let progress = $state(0);
  let isFinished = $state(false);

	$effect(() => {
		if (!userProfile || !userProfile.id) {
			goto('/auth/login');
		}
	});

	//function renderView() {
	//	switch (dashboardStore.currentView) {
	//		case DASHBOARD_VIEWS.PROJECTS:
	//			return () => PageDashboardProjects;
	//		default:
	//			return () => PageDashboardProjects;
	//	}
	//}
</script>

{#if timer.isNotFinished}
	<PageProgressBar />
{/if}

{#if timer.isFinished}
	<div class="flex h-full w-full gap-8">
		<div class="w-[20%] min-w-[250px]">
			<Button
				variant="ghost"
				class="text-white"
				onclick={() => (dashboardStore.currentView = DASHBOARD_VIEWS.PROJECTS)}
			>
				<!--<FolderKanban class="!h-5 !w-5" />-->
				<span class="text-lg font-medium">{DASHBOARD_VIEWS.PROJECTS}</span>
			</Button>
		</div>
		{#if dashboardStore.currentView === DASHBOARD_VIEWS.PROJECTS}
			<PageDashboardProjects />
		{/if}
	</div>
{/if}
