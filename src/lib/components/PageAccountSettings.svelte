<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Checkbox } from '$lib/components/ui/checkbox';
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
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
	import { toast } from 'svelte-sonner';

	import PageDeleteAccount from '$lib/components/PageDeleteAccount.svelte';

	const uniqueId = `displayName-${userStore.id}-${crypto.randomUUID()}`;

	async function handleSave() {
		if (!userStore.displayName?.trim()) {
			toast.error('Invalid name', {
				description: 'Display name cannot be empty.'
			});
			return;
		}

		const result = await fetch(
			`/api/v1/profiles/update?displayName=${userStore.displayName.trim()}&hideEmail=${userStore.hideEmail}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			}
		);

		if (result.ok) {
			toast.success('Settings updated', {
				description: 'Your display name has been updated successfully.'
			});
			dialogStore.showAccountSettingsDialog = false;
		} else {
			toast.error('Error', {
				description: 'Failed to update display name. Please try again.'
			});
		}
	}
</script>

<Dialog
	open={dialogStore.showAccountSettingsDialog}
	onOpenChange={() => (dialogStore.showAccountSettingsDialog = false)}
>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Account Settings</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Below you can adjust your personal account information.
			</DialogDescription>
		</DialogHeader>
		<div class="grid gap-4 py-2">
			<div class="grid gap-2">
				<Label for={uniqueId} class="text-base">Display Name</Label>
				<Input
					id={uniqueId}
					value={userStore.displayName}
					on:input={(e: Event) =>
						(userStore.displayName = (e.target as HTMLInputElement).value.trim())}
					placeholder="Enter your display name"
					class="text-lg"
					autofocus={false}
				/>
			</div>
		</div>
		<div class="flex items-center space-x-2">
			<Checkbox
				id="hide-email"
				checked={userStore.hideEmail}
				onCheckedChange={(checked: boolean | 'indeterminate') =>
					(userStore.hideEmail = checked === true)}
			/>
			<Label
				for="hide-email"
				class="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
			>
				Hide email from public profile
			</Label>
		</div>
		<div class="mt-4 border-t pt-2">
			<span
				>You can <Button
					variant="link"
					onclick={() => {
						dialogStore.showDeleteAccountDialog = true;
						dialogStore.showAccountSettingsDialog = false;
					}}
					class="cursor-pointer p-0 font-bold"
				>
					delete your account
				</Button> and all of its associated data at any given time. Please note that this action is irreversible.</span
			>
		</div>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => (dialogStore.showAccountSettingsDialog = false)}
				>Cancel</Button
			>
			<Button onclick={handleSave} disabled={!userStore.displayName}>Save changes</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>

<PageDeleteAccount />
