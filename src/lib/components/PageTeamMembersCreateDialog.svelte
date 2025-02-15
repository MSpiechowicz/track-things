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
	import { teamMembersCreateSchemaValidator } from '$lib/validators/teamMembersCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	import PageDeleteAccount from '$lib/components/PageDeleteAccount.svelte';

	const form = superForm(
		{
			email: teamMembersStore.currentMemberEmail ?? '',
      teamId: teamMembersStore.currentMemberTeamId ?? ''
		},
		{
			validators: teamMembersCreateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result.type;

        console.log(event.result);

				if (eventType === 'success') {
          // @ts-expect-error - data is present
          const existingMember = teamMembersStore.data?.filter(member => member.email === event.result.data?.email);

          if (!existingMember || existingMember?.length === 0) {
            teamMembersStore.data = [];
            teamMembersStore.data.push({
              id: event.result.data?.id,
              email: event.result.data?.email,
              created_at: event.result.data?.created_at
            });
          }

          dialogStore.showTeamMembersCreate = false;

					toast.success('Success', {
						description: 'Your team has been updated successfully.'
					});
				}

				if (eventType === 'failure') {
					toast.error('Error', {
						description: 'We were unable to update your team. Please try again.'
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
	open={dialogStore.showTeamMembersCreate}
	onOpenChange={() => {
    console.log('onOpenChange');
		dialogStore.showTeamMembersCreate = false;
		form.reset();
		teamMembersStore.currentMemberEmail = null;
		//teamMembersStore.currentMemberTeamId = null;
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
						This is the email address of the team member you wish to add.
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
						dialogStore.showTeamMembersCreate = false;
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
