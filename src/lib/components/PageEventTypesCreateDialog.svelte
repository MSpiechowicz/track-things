<script lang="ts">
	import { invalidate } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import PageFormInput from '$lib/components/PageFormInput.svelte';
	import PageFormLabel from '$lib/components/PageFormLabel.svelte';
	import { Button } from '$lib/components/ui/button';
	import ColorPicker from '$lib/components/ui/color-picker/color-picker.svelte';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
	import { t } from '$lib/translations';
	import { eventTypesCreateSchemaValidator } from '$lib/validators/eventTypesCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	const mockTeams = $state([
		{ id: '1', name: 'Engineering Team' },
		{ id: '2', name: 'Design Team' },
		{ id: '3', name: 'Marketing Team' },
		{ id: '4', name: 'Product Team' }
	]);

	const form = superForm(
		{
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

	function getCollaborators() {
		if ($formData.collaborators.length > 0) {
			let collaboratorsIndex = 0;
			let collaborators: string[] = [];

			$formData.collaborators.forEach((value, index) => {
				if (index < 2) {
					collaborators.push(value);
				} else {
					collaboratorsIndex++;
					collaborators[2] = `+${collaboratorsIndex} more`;
				}
			});

			return collaborators.join(', ');
		}
	}

	$effect(() => {
		console.log('form data', $formData);
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
		<input type="hidden" name="color" value={$formData.color} />
		{#each $formData.collaborators as collaborator}
			<input type="hidden" name="collaborators" value={collaborator?.trim()} />
		{/each}
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
						multiple
						onSelectedChange={(v) => {
							if (v && v.length > 0) {
								v.forEach((entry) => {
									const sanitizedEntry = entry.label?.trim();

									if (!$formData.collaborators.includes(sanitizedEntry as string)) {
										$formData.collaborators = [
											...$formData.collaborators,
											sanitizedEntry as string
										];
									} else {
										const filteredCollaborators = $formData.collaborators.filter(
											(collaborator) => collaborator === sanitizedEntry
										);
										$formData.collaborators = [...filteredCollaborators];
									}
								});
							} else {
								$formData.collaborators = [];
							}
						}}
					>
						<SelectTrigger {...attrs} class="w-full">
							{#if $formData.collaborators.length > 0}
								<span class="block truncate">
									{getCollaborators()}
								</span>
							{:else}
								<span class="text-md text-muted-foreground">
									{t('eventTypes.dialog.create.form.collaborators.input.placeholder')}
								</span>
							{/if}
						</SelectTrigger>
						<SelectContent class="text-black">
							{#each mockTeams as team}
								<SelectItem value={team.id}>
									{team.name}
								</SelectItem>
							{/each}
						</SelectContent>
					</Select>
				</div>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>
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
