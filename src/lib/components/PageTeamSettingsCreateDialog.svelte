<script lang="ts">
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
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { teamSettingsCreateSchemaValidator } from '$lib/validators/teamSettingsCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	const form = superForm(
		{
			name: ''
		},
		{
			validators: teamSettingsCreateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result?.type;
				// @ts-expect-error - This is a valid type
				const eventData = event.result?.data;

				if (eventType === 'success') {
					teamSettingsOwnerStore.data.push({
						id: eventData?.id,
						name: eventData?.name,
						created_at: eventData?.created_at,
						updated_at: eventData?.updated_at,
						tracking_ids: [],
						members: 0
					});

					dialogStore.showTeamSettingsCreateDialog = false;
					form.reset();

					toast.success('Success', {
						description: 'Your team has been created successfully.'
					});
				} else {
					toast.error('Error', {
						description:
							'We were unable to add your team. Please try again or check if this team already exists.'
					});
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<PageDialog
	open={dialogStore.showTeamSettingsCreateDialog}
	onOpenChange={() => {
		dialogStore.showTeamSettingsCreateDialog = false;
		form.reset();
	}}
	dialogTitle="Create New Team"
	dialogDescription="Please fill out the required fields below in order to create a new team."
>
	<form
		method="POST"
		action="/api/v1/team-settings/create"
		class="mt-2 space-y-8"
		use:enhance
		id="create-team-member-form"
		data-sveltekit-reload
	>
		<FormField {form} name="name" let:errors>
			<FormControl let:attrs>
				<FormLabel class="text-md !text-black">Team Name</FormLabel>
				<FormDescription class="mb-4 text-sm text-neutral-400">
					This is the name of the new team for your reference.
				</FormDescription>
				<Input
					bind:value={$formData.name}
					class="text-md mt-1 max-w-sm text-black focus-visible:{errors.length > 0
						? 'ring-red-500'
						: 'ring-blue-600'} focus-visible:ring-offset-0 {errors.length > 0
						? 'ring-2 ring-red-500'
						: 'ring-2 ring-blue-600'}"
					placeholder="Enter the email"
					autocomplete="off"
					{...attrs}
				/>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>
		<PageDialogFooter
			onCancelClick={() => {
				dialogStore.showTeamSettingsCreateDialog = false;
				form.reset();
			}}
		>
			<Button type="submit" disabled={!$formData.name}>Save changes</Button>
		</PageDialogFooter>
	</form>
</PageDialog>
