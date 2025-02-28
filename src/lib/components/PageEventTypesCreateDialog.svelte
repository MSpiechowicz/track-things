<script lang="ts">
	import { invalidateAll } from '$app/navigation';
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

	const form = superForm(
		{
			title: eventTypesStore.currentEventTypeTitle ?? '',
			color: eventTypesStore.currentEventTypeColor ?? '',
			teams: eventTypesStore.currentEventTypeTeams ?? []
		},
		{
			dataType: 'json',
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
						teams: eventData?.teams
					});
					eventTypesStore.resetCurrentEventType();

					dialogStore.showEventTypesCreateDialog = false;
					form.reset();

					invalidateAll();

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

	function getTeams({ isMobile }: { isMobile: boolean }) {
		if ($formData.teams?.length > 0) {
			let teamsIndex = 0;
			let teams: string[] = [];

			const maxTeams = isMobile ? 1 : 2;

			$formData.teams.forEach((entry, index) => {
				if (index < maxTeams) {
					teams.push(entry.name);
				} else {
					teamsIndex++;
					teams[maxTeams] = `+${teamsIndex} more`;
				}
			});

			return teams.join(', ');
		}
	}
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
		{#each $formData.teams as team}
			<input type="hidden" name="teams" value={JSON.stringify(team)} />
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

		<FormField {form} name="teams">
			<FormControl let:attrs>
				<PageFormLabel
					label={t('eventTypes.dialog.create.form.teams.label')}
					description={t('eventTypes.dialog.create.form.teams.description')}
				/>
				<div class="max-w-sm">
					<Select
						multiple
						onSelectedChange={(v) => {
							if (v && v.length > 0) {
								$formData.teams = v.map((entry) => ({
									id: entry.value as string,
									name: entry.label?.trim() ?? ''
								}));
							} else {
								$formData.teams = [];
							}
						}}
					>
						<SelectTrigger {...attrs}>
							{#if $formData.teams?.length > 0}
								<div class="hidden md:block">
									{getTeams({ isMobile: false })}
								</div>
								<div class="block md:hidden">
									{getTeams({ isMobile: true })}
								</div>
							{:else}
								<span class="text-md text-muted-foreground">
									{t('eventTypes.dialog.create.form.teams.input.placeholder')}
								</span>
							{/if}
						</SelectTrigger>
						<SelectContent class="text-black">
							{#each eventTypesStore.availableTeams as team}
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
