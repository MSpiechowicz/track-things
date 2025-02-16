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
	import { teamSettingsStore } from '$lib/stores/teamSettingsStore.svelte';
	import { teamMembersCreateSchemaValidator } from '$lib/validators/teamMembersCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	import PageDeleteAccount from '$lib/components/PageDeleteAccount.svelte';

	const form = superForm(
		{
			email: '',
			teamId: teamMembersStore.currentMemberTeamId ?? ''
		},
		{
			validators: teamMembersCreateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result.type as 'success' | 'failure';

				if (eventType === 'success') {
					// Check if member already exists
					const existingMember = teamMembersStore.data.find(
						member => member.email === event.result.data?.email
					);

					if (!existingMember) {
						// Update teamMembersStore
						teamMembersStore.data.push({
							id: event.result.data?.id,
							email: event.result.data?.email,
							name: event.result.data?.name,
							permissions: event.result.data?.permissions,
							created_at: event.result.data?.created_at
						});

						// Update currentTeamMembers
						teamSettingsStore.currentTeamMembers.push({
							id: event.result.data?.id,
							email: event.result.data?.email,
							name: event.result.data?.name,
							permissions: event.result.data?.permissions,
							created_at: event.result.data?.created_at
						});

						// Update the members array in the main data array
						teamSettingsStore.data = teamSettingsStore.data.map((team) => {
							if (team.id === teamMembersStore.currentMemberTeamId) {
								return {
									...team,
									members: [
										...team.members,
										{
											id: event.result.data?.id,
											email: event.result.data?.email,
											name: event.result.data?.name,
											permissions: event.result.data?.permissions,
											created_at: event.result.data?.created_at
										}
									]
								};
							}
							return team;
						});

						dialogStore.showTeamMembersCreateDialog = false;
						form.reset();

						toast.success('Success', {
							description: 'Your team member has been added successfully.'
						});
					}
				}

				if (eventType === 'failure') {
					toast.error('Error', {
						description: 'We were unable to add your team member. Please try again.'
					});
				}
			}
		}
	);

	const { form: formData, enhance } = form;

  $effect(() => {
    $formData.teamId = teamMembersStore.currentMemberTeamId ?? '';
  });
</script>

<Dialog
	open={dialogStore.showTeamMembersCreateDialog}
	onOpenChange={() => {
		dialogStore.showTeamMembersCreateDialog = false;
		form.reset();
		teamMembersStore.currentMemberEmail = null;
		teamMembersStore.currentMemberTeamId = null;
	}}
>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Add Team Member</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Below you can add a new team member to your team.
			</DialogDescription>
		</DialogHeader>
		<form
			method="POST"
			action="/api/v1/team-members/create"
			class="mt-6 space-y-8"
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
			<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
				<Button
					variant="outline"
					onclick={() => {
						dialogStore.showTeamMembersCreateDialog = false;
						form.reset();
						teamMembersStore.currentMemberEmail = null;
						teamMembersStore.currentMemberTeamId = null;
					}}>Cancel</Button
				>
				<Button type="submit" disabled={!$formData.email}>Save changes</Button>
			</DialogFooter>
		</form>
	</DialogContent>
</Dialog>

<PageDeleteAccount />
