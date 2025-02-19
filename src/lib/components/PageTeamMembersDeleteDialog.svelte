<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamMembersStore } from '$lib/stores/teamMembersStore.svelte';
	import { toast } from 'svelte-sonner';

	async function handleDelete(email: string | null, teamId: string | null) {
		if (!email || !teamId) {
			toast.error('Error', {
				description: 'We are unable to delete this team member due to invalid email or team ID.'
			});
			return;
		}

		const response = await fetch(`/api/v1/team-members/delete?email=${email}&teamId=${teamId}`, {
			method: 'DELETE'
		});

		const result = await response.json();

		if (result.success) {
			teamMembersStore.data = teamMembersStore.data.filter((entry) => entry.email !== email);
			teamMembersStore.resetCurrentMember();

			dialogStore.showTeamMembersDeleteDialog = false;

			invalidate('app:dashboard');

			toast.success('Success', {
				description: 'Your team member has been deleted successfully.'
			});
		} else {
			toast.error('Error', {
				description: 'We are unable to delete this team member. Please try again later.'
			});
		}
	}
</script>

<PageDialog
	open={dialogStore.showTeamMembersDeleteDialog}
	onOpenChange={() => {
		dialogStore.showTeamMembersDeleteDialog = false;
		teamMembersStore.resetCurrentMember();
	}}
	dialogTitle="Delete Team Member"
	dialogDescription="Are you sure that you want to delete member <span class='font-bold'
		>{teamMembersStore.currentMemberName}</span>
	from your team?"
>
	<PageDialogFooter
		onCancelClick={() => {
			dialogStore.showTeamMembersDeleteDialog = false;
			teamMembersStore.resetCurrentMember();
		}}
	>
		<Button
			variant="destructive"
			onclick={() =>
				handleDelete(teamMembersStore.currentMemberEmail, teamMembersStore.currentMemberTeamId)}
			>Delete</Button
		>
	</PageDialogFooter>
</PageDialog>
