<script lang="ts">
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { t } from '$lib/translations';
</script>

<PageDialog
	open={dialogStore.showLogoutDialog}
	onOpenChange={() => (dialogStore.showLogoutDialog = false)}
	dialogTitle={t('userMenu.dialog.title')}
	dialogDescription={t('userMenu.dialog.description')}
>
	<PageDialogFooter onCancelClick={() => (dialogStore.showLogoutDialog = false)}>
		<Button variant="destructive" href="/auth/logout"
			>{t('userMenu.dialog.button.signOut.label')}</Button
		>
	</PageDialogFooter>
</PageDialog>
