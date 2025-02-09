<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
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

<Dialog
	open={dialogStore.showDeleteAccount}
	onOpenChange={(open) => (dialogStore.showDeleteAccount = open)}
>
	<DialogContent>
		<DialogHeader>
			<DialogTitle class="text-xl">Delete Account</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Are you sure you want to delete your account? This action cannot be undone and all your data will be lost.
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => (dialogStore.showDeleteAccount = false)}>
				Cancel
			</Button>
			<Button variant="destructive" onclick={handleDeleteAccount}>Delete Account</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
