<script lang="ts">
	import { goto } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
	import { t } from '$lib/translations';
	import { toast } from 'svelte-sonner';

	async function handleDeleteAccount() {
		const response = await fetch('/api/v1/profiles/delete', {
			method: 'POST'
		});

		if (response.ok) {
			dialogStore.closeAll();
			userStore.clearData();

			toast.success(t('deleteAccount.toast.success.title'), {
				description: t('deleteAccount.toast.success.description')
			});

			goto('/');
		} else {
			toast.error(t('deleteAccount.toast.error.title'), {
				description: t('deleteAccount.toast.error.description')
			});
		}
	}
</script>

<PageDialog
	open={dialogStore.showDeleteAccountDialog}
	onOpenChange={() => (dialogStore.showDeleteAccountDialog = false)}
	dialogTitle={t('deleteAccount.dialog.title')}
	dialogDescription={t('deleteAccount.dialog.description')}
	><PageDialogFooter onCancelClick={() => (dialogStore.showDeleteAccountDialog = false)}>
		<Button variant="destructive" onclick={handleDeleteAccount}
			>{t('deleteAccount.dialog.button.label')}</Button
		>
	</PageDialogFooter>
</PageDialog>
