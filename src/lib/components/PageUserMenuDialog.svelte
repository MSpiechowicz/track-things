<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter
	} from '$lib/components/ui/dialog';
	import { Button } from '$lib/components/ui/button';
	import { dialog } from '$lib/stores/dialogStore.svelte';
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
			<Button variant="destructive" href="/auth/logout">Sign Out</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
