<script lang="ts">
	import { goto } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
	import { toast } from 'svelte-sonner';

	async function handleDeleteAccount() {
		const response = await fetch('/api/v1/profiles/delete', {
			method: 'POST'
		});

		if (response.ok) {
			dialogStore.closeAll();
			userStore.clearData();

			toast.success('Account deleted', {
				description: 'Your account has been deleted successfully. We are sorry to see you go.'
			});

			goto('/');
		} else {
			toast.error('Failed to delete account', {
				description: 'We were unable to delete your account. Please try again later.'
			});
		}
	}
</script>

<PageDialog
	open={dialogStore.showDeleteAccountDialog}
	onOpenChange={() => (dialogStore.showDeleteAccountDialog = false)}
	dialogTitle="Delete Account"
	dialogDescription="Are you sure you want to delete your account? This action cannot be undone and all your data will be lost."
	><PageDialogFooter onCancelClick={() => (dialogStore.showDeleteAccountDialog = false)}>
		<Button variant="destructive" onclick={handleDeleteAccount}>Delete Account</Button>
	</PageDialogFooter>
</PageDialog>
