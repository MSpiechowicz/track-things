<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamMembersStore } from '$lib/stores/teamMembersStore.svelte';
	import { t } from '$lib/translations';
	import { toast } from 'svelte-sonner';

	async function handleDelete(email: string | null, teamId: string | null) {
		const response = await fetch(`/api/v1/team-members/delete?email=${email}&teamId=${teamId}`, {
			method: 'DELETE'
		});

		const result = await response.json();

		if (result.success) {
			teamMembersStore.data = teamMembersStore.data.filter((entry) => entry.email !== email);
			teamMembersStore.resetCurrentMember();

			dialogStore.showTeamMembersDeleteDialog = false;

			invalidate('app:dashboard');

			toast.success(t('teamMembers.dialog.delete.toast.success.title'), {
				description: t('teamMembers.dialog.delete.toast.success.description')
			});
		} else {
			toast.error(t('teamMembers.dialog.delete.toast.error.title'), {
				description: t('teamMembers.dialog.delete.toast.error.description')
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
	dialogTitle={t('teamMembers.dialog.delete.title')}
	dialogDescription={t('teamMembers.dialog.delete.description', {
		1: teamMembersStore.currentMemberName ?? ''
	})}
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
			>{t('teamMembers.dialog.delete.button.delete.label')}</Button
		>
	</PageDialogFooter>
</PageDialog>
