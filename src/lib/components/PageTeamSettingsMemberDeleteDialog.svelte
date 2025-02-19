<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
	import { teamSettingsTimer } from '$lib/utils/timers/defaults';
	import { toast } from 'svelte-sonner';

	async function handleDelete(id: string | null) {
		if (!id) {
			toast.error('Error', {
				description: 'We are unable to remove your from this team due to invalid ID.'
			});
			return;
		}

		const response = await fetch(
			`/api/v1/team-settings/member/delete?teamId=${teamSettingsMemberStore.currentMemberTeamId}`,
			{
				method: 'DELETE'
			}
		);

		if (response.ok) {
			teamSettingsMemberStore.data = teamSettingsMemberStore.data.filter(
				(entry) => entry.id !== id
			);
			teamSettingsMemberStore.resetCurrentMember();

			dialogStore.showTeamSettingsMemberDeleteDialog = false;

			teamSettingsTimer.reset();

			invalidate('app:dashboard');

			toast.success('Success', {
				description: 'You have been removed from the selected team successfully.'
			});
		} else {
			toast.error('Error', {
				description: 'We are unable to remove you from the selected team. Please try again later.'
			});
		}
	}
</script>

<PageDialog
	open={dialogStore.showTeamSettingsMemberDeleteDialog}
	onOpenChange={() => {
		dialogStore.showTeamSettingsMemberDeleteDialog = false;
		teamSettingsMemberStore.resetCurrentMember();
	}}
	dialogTitle="Delete Membership"
	dialogDescription="Are you sure you want to remove yourself from the team <span class='font-bold'
		>{teamSettingsMemberStore.currentMemberTeamName}</span>?"
>
	<PageDialogFooter
		onCancelClick={() => {
			dialogStore.showTeamSettingsMemberDeleteDialog = false;
			teamSettingsMemberStore.resetCurrentMember();
		}}
	>
		<Button
			variant="destructive"
			onclick={() => handleDelete(teamSettingsMemberStore.currentMemberTeamId)}>Delete</Button
		>
	</PageDialogFooter>
</PageDialog>
