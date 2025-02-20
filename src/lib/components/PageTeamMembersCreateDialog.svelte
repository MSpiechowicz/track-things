<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import PageFormInput from '$lib/components/PageFormInput.svelte';
	import PageFormLabel from '$lib/components/PageFormLabel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamMembersStore } from '$lib/stores/teamMembersStore.svelte';
	import { teamMembersCreateSchemaValidator } from '$lib/validators/teamMembersCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { t } from '$lib/translations';

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

					toast.success(t('teamMembers.dialog.create.toast.success.title'), {
						description: t('teamMembers.dialog.create.toast.success.description')
					});
				} else {
					toast.error(t('teamMembers.dialog.create.toast.error.title'), {
						description: t('teamMembers.dialog.create.toast.error.description')
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
	dialogTitle={t('teamMembers.dialog.create.title')}
	dialogDescription={t('teamMembers.dialog.create.description')}
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
				<PageFormLabel
					label={t('teamMembers.dialog.create.form.email.label')}
					description={t('teamMembers.dialog.create.form.email.description')}
				/>
				<PageFormInput
					bind:value={$formData.email}
					{errors}
					{attrs}
					placeholder={t('teamMembers.dialog.create.form.email.input.placeholder')}
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
			<Button type="submit" disabled={!$formData.email}
				>{t('teamMembers.dialog.create.form.button.save.label')}</Button
			>
		</PageDialogFooter>
	</form>
</PageDialog>
