<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import PageFormInput from '$lib/components/PageFormInput.svelte';
	import PageFormLabel from '$lib/components/PageFormLabel.svelte';
	import { Button } from '$lib/components/ui/button';
	import ColorPicker from '$lib/components/ui/color-picker/color-picker.svelte';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';
	import {
		Select,
		SelectContent,
		SelectItem,
		SelectTrigger,
		SelectValue
	} from '$lib/components/ui/select';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
	import { t } from '$lib/translations';
	import { eventTypesCreateSchemaValidator } from '$lib/validators/eventTypesCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import PageEventTypesCreateDialogBadgePill from './PageEventTypesCreateDialogBadgePill.svelte';

	const mockTeams = $state([
		{ id: '1', name: 'Engineering Team' },
		{ id: '2', name: 'Design Team' },
		{ id: '3', name: 'Marketing Team' },
		{ id: '4', name: 'Product Team' }
	]);

	const form = superForm(
		{
			id: eventTypesStore.currentEventTypeId ?? '',
			title: eventTypesStore.currentEventTypeTitle ?? '',
			color: eventTypesStore.currentEventTypeColor ?? '',
			collaborators: eventTypesStore.currentEventTypeCollaborators ?? []
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
		<!--<input
			type="hidden"
			name="collaborators"
			value={eventTypesStore.currentEventTypeCollaborators.join(',')}
		/>-->
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

		<FormField {form} name="collaborators">
			<FormControl let:attrs>
				<PageFormLabel
					label={t('eventTypes.dialog.create.form.collaborators.label')}
					description={t('eventTypes.dialog.create.form.collaborators.description')}
				/>
				<div class="max-w-sm">
					<Select
						onSelectedChange={(v) => {
							if (!eventTypesStore.currentEventTypeCollaborators.includes(v?.label as string)) {
								eventTypesStore.currentEventTypeCollaborators.push(v?.label as string);
							}
						}}
					>
						<SelectTrigger {...attrs}>
							<SelectValue
								placeholder={t('eventTypes.dialog.create.form.collaborators.input.placeholder')}
							/>
						</SelectTrigger>
						<SelectContent class="text-black">
							{#each mockTeams as team}
								<SelectItem value={team.id}>
									{team.name}
								</SelectItem>
							{/each}
						</SelectContent>
					</Select>
					<div class="flex flex-wrap gap-2 mt-3">
						{#each eventTypesStore.currentEventTypeCollaborators as collaborator}
							<PageEventTypesCreateDialogBadgePill
								label={collaborator}
							/>
						{/each}
					</div>
				</div>
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
