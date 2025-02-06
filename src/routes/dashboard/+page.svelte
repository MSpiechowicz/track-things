<script lang="ts">
	import { goto } from '$app/navigation';
	import PageDashboardProjects from '$lib/components/PageDashboardProjects.svelte';
	import PageProgressBar from '$lib/components/PageProgressBar.svelte';
	import { Button } from '$lib/components/ui/button';
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { useElapsedTime } from '$lib/timers.svelte';

	const { data } = $props();
	const { userProfile } = $derived(data);

	let { progress, isFinished } = useElapsedTime();

	console.log('progress', progress);

	$effect(() => {
		if (!userProfile || !userProfile.id) {
			goto('/auth/login');
		}
	});

	function renderView() {
		switch (dashboardStore.currentView) {
			case DASHBOARD_VIEWS.PROJECTS:
				return PageDashboardProjects;
			default:
				return PageDashboardProjects;
		}
	}

</script>

{#if !isFinished && userProfile?.id}
	<PageProgressBar {progress} />
{/if}

{#if isFinished && userProfile?.id}
	<div class="flex h-full w-full gap-8">
		<div class="w-[20%] min-w-[250px]">
			<Button
				variant="ghost"
				class="text-white"
				onclick={() => (dashboardStore.currentView = DASHBOARD_VIEWS.PROJECTS)}
			>
				<!--<FolderKanban class="!h-5 !w-5" />-->
				<span class="text-lg font-medium">DASHBOARD_VIEWS.PROJECTS</span>
			</Button>
		</div>
		{renderView()}
	</div>
{/if}
