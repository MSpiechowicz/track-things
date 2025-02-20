<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { teamSettingsTimer } from '$lib/utils/timers/defaults';
	import { toast } from 'svelte-sonner';
	import { t } from '$lib/translations';

	async function handleDelete(id: string | null) {
		const response = await fetch(`/api/v1/team-settings/delete?id=${id}`, {
			method: 'POST'
		});

		if (response.ok) {
			teamSettingsOwnerStore.data = teamSettingsOwnerStore.data.filter((entry) => entry.id !== id);
			teamSettingsOwnerStore.resetCurrentTeam();

			dialogStore.showTeamSettingsDeleteDialog = false;

			teamSettingsTimer.reset();

			invalidate('app:dashboard');

			toast.success(t('teamSettings.dialog.delete.toast.success.title'), {
				description: t('teamSettings.dialog.delete.toast.success.description')
			});
		} else {
			toast.error(t('teamSettings.dialog.delete.toast.error.title'), {
				description: t('teamSettings.dialog.delete.toast.error.description')
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
	dialogTitle={t('teamSettings.dialog.delete.title')}
	dialogDescription={t('teamSettings.dialog.delete.description', {
		1: teamSettingsOwnerStore.currentTeamName ?? ''
	})}
>
	<PageDialogFooter
		onCancelClick={() => {
			dialogStore.showTeamSettingsDeleteDialog = false;
			teamSettingsOwnerStore.resetCurrentTeam();
		}}
	>
		<Button variant="destructive" onclick={() => handleDelete(teamSettingsOwnerStore.currentTeamId)}
			>{t('teamSettings.dialog.delete.button.delete.label')}</Button
		>
	</PageDialogFooter>
</PageDialog>
