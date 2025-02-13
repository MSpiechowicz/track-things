<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { teamStore } from '$lib/stores/teamStore.svelte';
	import { toast } from 'svelte-sonner';
	import DashboardContainer from './PageDashboardContainer.svelte';

	async function handleCreateTeam() {
		const response = await fetch('/api/teams/create?name=' + teamStore.name, {
			method: 'POST'
		});

		if (response.ok) {
			toast.success('Success!', {
				description: 'Team created successfully'
			});

			dashboardStore.currentView = DASHBOARD_VIEWS.TEAM_SETTINGS;
		} else {
			toast.error('Error!', {
				description: 'Failed to create team'
			});
		}
	}
</script>

<DashboardContainer title={DASHBOARD_VIEWS.TEAM_SETTINGS}>
	<div class="mt-8 flex flex-1 flex-col max-w-[80ch]">
		<h2 class="mb-2 text-xl font-medium">Create New Team</h2>
		<p class="mb-6 text-sm text-neutral-500">
			In order to be able to use the Team Settings, you need to create a new team. Please fill in
			the required information below.
		</p>
		<div class="space-y-8">
			<div class="space-y-2">
				<Label for="name">Team Name</Label>
				<Input id="name" class="mt-2 max-w-sm text-black focus-visible:ring-blue-600 focus-visible:ring-offset-0 text-lg" bind:value={teamStore.name} placeholder="Enter team name" />
			</div>

			<Button on:click={handleCreateTeam}>Create New Team</Button>
		</div>
	</div>
</DashboardContainer>
