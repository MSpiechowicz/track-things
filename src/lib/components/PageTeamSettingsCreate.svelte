<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { DASHBOARD_VIEWS } from '$lib/constants';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { teamStore } from '$lib/stores/teamStore.svelte';
	import { toast } from 'svelte-sonner';

	async function handleCreateTeam() {
		const response = await fetch('/api/v1/team-settings/create?name=' + teamStore.name, {
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

<div class="mt-8 flex max-w-[80ch] flex-1 flex-col">
	<h2 class="mb-2 text-xl font-medium">Create New Team</h2>
	<p class="mb-6 text-sm text-neutral-500">
		In order to be able to use the Team Settings, you need first to create a new team. Please fill
		in the required information below.
	</p>
	<div class="space-y-8">
		<div class="space-y-6">
			<div class="space-y-2">
				<Label for="name">Team Name</Label>
				<Input
					id="name"
					type="text"
					bind:value={teamStore.name}
					placeholder="Enter team name"
					class="text-md mt-2 max-w-sm text-black focus-visible:ring-blue-600 focus-visible:ring-offset-0"
					aria-invalid={!teamStore.name.trim()}
					aria-errormessage="name-error"
				/>
			</div>
			<Button onclick={handleCreateTeam} disabled={!teamStore.name.trim()}>
				Create New Team
			</Button>
		</div>
	</div>
</div>
