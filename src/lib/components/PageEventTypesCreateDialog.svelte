<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import PageFormInput from '$lib/components/PageFormInput.svelte';
	import PageFormLabel from '$lib/components/PageFormLabel.svelte';
	import { Button } from '$lib/components/ui/button';
	import ColorPicker from '$lib/components/ui/color-picker/color-picker.svelte';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
	import { t } from '$lib/translations';
	import { eventTypesCreateSchemaValidator } from '$lib/validators/eventTypesCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	const form = superForm(
		{
      id: eventTypesStore.currentEventTypeId ?? '',
			title: eventTypesStore.currentEventTypeTitle ?? '',
			color: eventTypesStore.currentEventTypeColor ?? '',
		},
		{
			validators: eventTypesCreateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result?.type;
				// @ts-expect-error - This is a valid type
				const eventData = event.result?.data;

				if (eventType === 'success') {
					eventTypesStore.data.push({
						id: eventData?.id,
						title: eventData?.title,
						color: eventData?.color,
						created_at: eventData?.created_at,
						updated_at: eventData?.updated_at,
						collaborators: eventData?.collaborators
					});
					eventTypesStore.resetCurrentEventType();

					dialogStore.showTeamMembersCreateDialog = false;
					form.reset();

					invalidate('app:dashboard');

					toast.success(t('eventTypes.dialog.create.toast.success.title'), {
						description: t('eventTypes.dialog.create.toast.success.description')
					});
				} else {
					toast.error(t('eventTypes.dialog.create.toast.error.title'), {
						description: t('eventTypes.dialog.create.toast.error.description')
					});
				}
			}
		}
	);

	const { form: formData, enhance } = form;

	$effect(() => {
		// We want to revalidate this effect when the dialog is open
		if (dialogStore.showEventTypesCreateDialog) {
			$formData.id = eventTypesStore.currentEventTypeId ?? '';
		}
	});
</script>

<PageDialog
	open={dialogStore.showEventTypesCreateDialog}
	onOpenChange={() => {
		dialogStore.showEventTypesCreateDialog = false;
		eventTypesStore.resetCurrentEventType();
		form.reset();
	}}
	dialogTitle={t('eventTypes.dialog.create.title')}
	dialogDescription={t('eventTypes.dialog.create.description')}
>
	<form
		method="POST"
		action="/api/v1/event-types/create"
		class="mt-2 space-y-8"
		use:enhance
		id="create-event-type-form"
		data-sveltekit-reload
	>
		<input type="hidden" name="id" value={eventTypesStore.currentEventTypeId ?? ''} />
    <input type="hidden" name="color" value={eventTypesStore.currentEventTypeColor ?? ''} />
    <input type="hidden" name="collaborators" value={eventTypesStore.currentEventTypeCollaborators ?? ''} />
		<FormField {form} name="title" let:errors>
			<FormControl let:attrs>
				<PageFormLabel
					label={t('eventTypes.dialog.create.form.title.label')}
					description={t('eventTypes.dialog.create.form.title.description')}
				/>
				<PageFormInput
					bind:value={$formData.title}
					{errors}
					{attrs}
					placeholder={t('eventTypes.dialog.create.form.title.input.placeholder')}
				/>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>

		<FormField {form} name="color">
			<FormControl>
				<PageFormLabel
					label={t('eventTypes.dialog.create.form.color.label')}
					description={t('eventTypes.dialog.create.form.color.description')}
				/>
				<ColorPicker bind:value={$formData.color} />
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>
    <!-- TODO: Add select for the collabolators. Under the view each of the collaborators should be displayed as a tag with X to remove it from the list -->
		<PageDialogFooter
			onCancelClick={() => {
				dialogStore.showEventTypesCreateDialog = false;
				eventTypesStore.resetCurrentEventType();
				form.reset();
			}}
		>
			<Button type="submit" disabled={!$formData.title}
				>{t('eventTypes.dialog.create.form.button.save.label')}</Button
			>
		</PageDialogFooter>
	</form>
</PageDialog>
