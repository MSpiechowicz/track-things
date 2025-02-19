<script lang="ts">
	import PageDeleteAccount from '$lib/components/PageDeleteAccount.svelte';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		FormControl,
		FormDescription,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
	import { accountSettingsSchemaValidator } from '$lib/validators/accountSettingsSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	const form = superForm(
		{
			displayName: userStore.displayName || ''
		},
		{
			validators: accountSettingsSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result?.type;
				// @ts-expect-error - This is a valid type
				const eventData = event.result?.data;

				if (eventType === 'success') {
					userStore.displayName = eventData.displayName;
					dialogStore.showAccountSettingsDialog = false;
					form.reset();

					toast.success('Settings updated', {
						description: 'Your display name has been updated successfully.'
					});
				} else {
					toast.error('Error', {
						description: 'We were unable to update your account settings. Please try again later.'
					});
				}
			}
		}
	);

	const { form: formData, enhance } = form;

	$effect(() => {
		// We want to revalidate this effect when the dialog is open
		if (dialogStore.showAccountSettingsDialog) {
			$formData.displayName = userStore.displayName ?? '';
		}
	});
</script>

<PageDialog
	open={dialogStore.showAccountSettingsDialog}
	onOpenChange={() => {
		dialogStore.showAccountSettingsDialog = false;
		form.reset();
	}}
	dialogTitle="Account Settings"
	dialogDescription="Below you can adjust your personal account information."
>
	<form
		method="POST"
		action="/api/v1/profiles/update"
		class="mt-2 space-y-8"
		use:enhance
		id="account-settings-form"
		data-sveltekit-reload
	>
		<FormField {form} name="displayName" let:errors>
			<FormControl let:attrs>
				<FormLabel class="text-md !text-black">Display Name</FormLabel>
				<FormDescription class="mb-4 text-sm text-neutral-400">
					This is your alternative name that will be displayed within the application.
				</FormDescription>
				<Input
					bind:value={$formData.displayName}
					class="text-md mt-1 max-w-sm text-black focus-visible:{errors.length > 0
						? 'ring-red-500'
						: 'ring-blue-600'} focus-visible:ring-offset-0 {errors.length > 0
						? 'ring-2 ring-red-500'
						: 'ring-2 ring-blue-600'}"
					placeholder="Enter your display name"
					autocomplete="off"
					{...attrs}
				/>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>
		<div class="mt-2 border-t pt-2">
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
		<PageDialogFooter
			onCancelClick={() => {
				dialogStore.showAccountSettingsDialog = false;
				form.reset();
			}}
		>
			<Button type="submit" disabled={!$formData.displayName || $formData.displayName.length < 3}
				>Save changes</Button
			>
		</PageDialogFooter>
	</form>
</PageDialog>

<PageDeleteAccount />
