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
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';

	import { accountSettings } from '$lib/stores/accountSettingStore.svelte';

	const { userId, currentDisplayName } = $props();

	let inputDisplayName = $state(currentDisplayName);

	function checkIfDisplayNameIsNotEmpty() {
		if (!inputDisplayName.trim()) {
			toast.error('Invalid name', {
				description: 'Display name cannot be empty.'
			});
			return;
		}
	}

	async function handleSave() {
		checkIfDisplayNameIsNotEmpty();

		//const result = await updateAccountSettingsDisplayName(userId, inputDisplayName.trim());

		const result = true;

		if (result) {
			toast.success('Settings updated', {
				description: 'Your display name has been updated successfully.'
			});
			accountSettings.show = false;
			inputDisplayName = inputDisplayName.trim();
		} else {
			toast.error('Error', {
				description: 'Failed to update display name. Please try again.'
			});
		}
	}
</script>

<Dialog open={accountSettings.show} onOpenChange={() => accountSettings.show = false}>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Account Settings</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Below you can adjust your personal account information.
			</DialogDescription>
		</DialogHeader>
		<div class="grid gap-4 py-4">
			<div class="grid gap-2">
				<Label for="displayName" class="text-base">Display Name</Label>
				<Input
					id="displayName"
					value={inputDisplayName}
					on:change={(e: Event) => (inputDisplayName = (e.target as HTMLInputElement).value)}
					placeholder="Enter your display name"
					class="text-lg"
				/>
			</div>
		</div>
		<DialogFooter class="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => accountSettings.show = false}>Cancel</Button>
			<Button onclick={handleSave} disabled={!inputDisplayName?.trim()}>Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
