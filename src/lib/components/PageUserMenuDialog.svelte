<script lang="ts">
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
</script>

<Dialog open={dialogStore.showLogoutDialog} onOpenChange={() => (dialogStore.showLogoutDialog = false)}>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Sign Out</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Are you sure you want to sign out of your account?
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => (dialogStore.showLogoutDialog = false)}>Cancel</Button>
			<Button variant="destructive" href="/auth/logout">Sign Out</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
