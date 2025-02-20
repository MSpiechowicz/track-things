<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
	import { teamSettingsTimer } from '$lib/utils/timers/defaults';
	import { toast } from 'svelte-sonner';
	import { t } from '$lib/translations';

	async function handleDelete(id: string | null) {
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

			toast.success(t('teamSettings.dialog.member.delete.toast.success.title'), {
				description: t('teamSettings.dialog.member.delete.toast.success.description')
			});
		} else {
			toast.error(t('teamSettings.dialog.member.delete.toast.error.title'), {
				description: t('teamSettings.dialog.member.delete.toast.error.description')
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
	dialogTitle={t('teamSettings.dialog.member.delete.title')}
	dialogDescription={t('teamSettings.dialog.member.delete.description', {
		1: teamSettingsMemberStore.currentMemberTeamName ?? ''
	})}
>
	<PageDialogFooter
		onCancelClick={() => {
			dialogStore.showTeamSettingsMemberDeleteDialog = false;
			teamSettingsMemberStore.resetCurrentMember();
		}}
	>
		<Button
			variant="destructive"
			onclick={() => handleDelete(teamSettingsMemberStore.currentMemberTeamId)}
			>{t('teamSettings.dialog.member.delete.button.delete.label')}</Button
		>
	</PageDialogFooter>
</PageDialog>
