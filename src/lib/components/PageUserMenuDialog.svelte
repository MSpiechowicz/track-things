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
	import { dialog } from '$lib/stores/dialogStore.svelte';
	import { toast } from 'svelte-sonner';

	async function handleLogout() {
		dialog.showLogout = false;

		try {
			const response = await fetch('/auth/logout', { method: 'POST' });

			if (response.ok) {
				toast.success('Signed out successfully', {
					description: 'You have been signed out of your account.'
				});
				goto('/');
			} else {
				throw new Error('Logout failed');
			}
		} catch (error) {
			toast.error('Error signing out', {
				description: 'Please try again.'
			});
		}
	}
</script>

<Dialog open={dialog.showLogout} onOpenChange={() => (dialog.showLogout = false)}>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Sign Out</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Are you sure you want to sign out of your account?
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => (dialog.showLogout = false)}>Cancel</Button>
			<Button variant="destructive" onclick={handleLogout}>Sign Out</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
