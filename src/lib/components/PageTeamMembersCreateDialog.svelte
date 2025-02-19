<script lang="ts">
	import { invalidate } from '$app/navigation';
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
	import { teamMembersStore } from '$lib/stores/teamMembersStore.svelte';
	import { teamMembersCreateSchemaValidator } from '$lib/validators/teamMembersCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	const form = superForm(
		{
			email: '',
			teamId: teamMembersStore.currentMemberTeamId ?? ''
		},
		{
			validators: teamMembersCreateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result?.type;
				// @ts-expect-error - This is a valid type
				const eventData = event.result?.data;

				if (eventType === 'success') {
					teamMembersStore.data.push({
						id: eventData?.id,
						email: eventData?.email,
						name: eventData?.name,
						permissions: eventData?.permissions,
						team_id: eventData?.team_id,
						created_at: eventData?.created_at
					});
					teamMembersStore.resetCurrentMember();

					dialogStore.showTeamMembersCreateDialog = false;
					form.reset();

					invalidate('app:dashboard');

					toast.success('Success', {
						description: 'Your team member has been added successfully.'
					});
				} else {
					toast.error('Error', {
						description:
							'We were unable to add your team member. Please try again or check if member with this email already exists.'
					});
				}
			}
		}
	);

	const { form: formData, enhance } = form;

	$effect(() => {
		// We want to revalidate this effect when the dialog is open
		if (dialogStore.showTeamMembersCreateDialog) {
			$formData.teamId = teamMembersStore.currentMemberTeamId ?? '';
		}
	});
</script>

<PageDialog
	open={dialogStore.showTeamMembersCreateDialog}
	onOpenChange={() => {
		dialogStore.showTeamMembersCreateDialog = false;
		teamMembersStore.resetCurrentMember();
		form.reset();
	}}
	dialogTitle="Add Team Member"
	dialogDescription="Below you can add a new team member to your team."
>
	<form
		method="POST"
		action="/api/v1/team-members/create"
		class="mt-2 space-y-8"
		use:enhance
		id="create-team-member-form"
		data-sveltekit-reload
	>
		<input type="hidden" name="teamId" value={teamMembersStore.currentMemberTeamId ?? ''} />
		<FormField {form} name="email" let:errors>
			<FormControl let:attrs>
				<FormLabel class="text-md !text-black">Email</FormLabel>
				<FormDescription class="mb-4 text-sm text-neutral-400">
					This is the email address of a new team member for your reference.
				</FormDescription>
				<Input
					bind:value={$formData.email}
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
				dialogStore.showTeamMembersCreateDialog = false;
				teamMembersStore.resetCurrentMember();
				form.reset();
			}}
		>
			<Button type="submit" disabled={!$formData.email}>Save changes</Button>
		</PageDialogFooter>
	</form>
</PageDialog>
