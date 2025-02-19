<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { teamSettingsTimer } from '$lib/utils/timers/defaults';
	import { toast } from 'svelte-sonner';

	async function handleDelete(id: string | null) {
		if (!id) {
			toast.error('Error', {
				description: 'We are unable to delete this team settings due to invalid ID.'
			});
			return;
		}

		const response = await fetch(`/api/v1/team-settings/delete?id=${id}`, {
			method: 'POST'
		});

		if (response.ok) {
			teamSettingsOwnerStore.data = teamSettingsOwnerStore.data.filter((entry) => entry.id !== id);
			teamSettingsOwnerStore.resetCurrentTeam();

			dialogStore.showTeamSettingsDeleteDialog = false;

			teamSettingsTimer.reset();

			invalidate('app:dashboard');

			toast.success('Success', {
				description: 'Your team settings has been deleted successfully.'
			});
		} else {
			toast.error('Error', {
				description: 'We are unable to delete this team settings. Please try again later.'
			});
		}
	}
</script>

<PageDialog
	open={dialogStore.showTeamSettingsDeleteDialog}
	onOpenChange={() => {
		dialogStore.showTeamSettingsDeleteDialog = false;
		teamSettingsOwnerStore.resetCurrentTeam();
	}}
	dialogTitle="Delete Team Settings"
	dialogDescription="Are you sure you want to delete team <span class='font-bold'
		>{teamSettingsOwnerStore.currentTeamName}</span> settings?"
>
	<PageDialogFooter
		onCancelClick={() => {
			dialogStore.showTeamSettingsDeleteDialog = false;
			teamSettingsOwnerStore.resetCurrentTeam();
		}}
	>
		<Button variant="destructive" onclick={() => handleDelete(teamSettingsOwnerStore.currentTeamId)}
			>Delete</Button
		>
	</PageDialogFooter>
</PageDialog>
