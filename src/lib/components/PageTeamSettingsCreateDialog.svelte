<script lang="ts">
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import PageFormInput from '$lib/components/PageFormInput.svelte';
	import PageFormLabel from '$lib/components/PageFormLabel.svelte';
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { t } from '$lib/translations';
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

					toast.success(t('teamSettings.dialog.create.toast.success.title'), {
						description: t('teamSettings.dialog.create.toast.success.description')
					});
				} else {
					toast.error(t('teamSettings.dialog.create.toast.error.title'), {
						description: t('teamSettings.dialog.create.toast.error.description')
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
	dialogTitle={t('teamSettings.dialog.create.title')}
	dialogDescription={t('teamSettings.dialog.create.description')}
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
				<PageFormLabel
					label={t('teamSettings.dialog.create.form.name.label')}
					description={t('teamSettings.dialog.create.form.name.description')}
				/>
				<PageFormInput
					bind:value={$formData.name}
					{errors}
					{attrs}
					placeholder={t('teamSettings.dialog.create.form.name.input.placeholder')}
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
			<Button type="submit" disabled={!$formData.name}>
				{t('teamSettings.dialog.create.form.button.save.label')}
			</Button>
		</PageDialogFooter>
	</form>
</PageDialog>
