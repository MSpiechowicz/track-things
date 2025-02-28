<script lang="ts">
	import { invalidateAll } from '$app/navigation';
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
	import { eventTypesTimer } from '$lib/utils/timers/defaults';
	import { eventTypesCreateSchemaValidator } from '$lib/validators/eventTypesCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import IconCheck from './svg/IconCheck.svelte';
	import IconUserGroup from './svg/IconUserGroup.svelte';

	const form = superForm(
		{
			id: eventTypesStore.currentEventTypeId ?? '',
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

					dialogStore.showEventTypesUpdateDialog = false;
					form.reset();

					eventTypesTimer.reset();

					invalidateAll();

					toast.success(t('eventTypes.dialog.update.toast.success.title'), {
						description: t('eventTypes.dialog.update.toast.success.description')
					});
				} else {
					toast.error(t('eventTypes.dialog.update.toast.error.title'), {
						description: t('eventTypes.dialog.update.toast.error.description')
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
					teams.push(entry.team_name);
				} else {
					teamsIndex++;
					teams[maxTeams] = `+${teamsIndex} more`;
				}
			});

			return teams.join(', ');
		}
	}

	const isDisabled = $derived(eventTypesStore.availableTeams.length === 0);

	$effect(() => {
    $formData.id = eventTypesStore.currentEventTypeId ?? '';
		$formData.title = eventTypesStore.currentEventTypeTitle ?? '';
		$formData.color = eventTypesStore.currentEventTypeColor ?? '';
		$formData.teams = eventTypesStore.currentEventTypeTeams ?? [];
	});
</script>

<PageDialog
	open={dialogStore.showEventTypesUpdateDialog}
	onOpenChange={() => {
		dialogStore.showEventTypesUpdateDialog = false;
		eventTypesStore.resetCurrentEventType();
		form.reset();
	}}
	dialogTitle={t('eventTypes.dialog.update.title')}
	dialogDescription={t('eventTypes.dialog.update.description')}
>
	<form
		method="POST"
		action="/api/v1/event-types/update"
		class="mt-2 space-y-8"
		use:enhance
		id="update-event-type-form"
		data-sveltekit-reload
	>
		<input type="hidden" name="id" value={$formData.id} />
		<input type="hidden" name="color" value={$formData.color} />
		{#each $formData.teams as team}
			<input type="hidden" name="teams" value={JSON.stringify(team)} />
		{/each}

		<FormField {form} name="title" let:errors>
			<FormControl let:attrs>
				<PageFormLabel
					label={t('eventTypes.dialog.update.form.title.label')}
					description={t('eventTypes.dialog.update.form.title.description')}
				/>
				<PageFormInput
					bind:value={$formData.title}
					{errors}
					{attrs}
					placeholder={t('eventTypes.dialog.update.form.title.input.placeholder')}
				/>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>

		<FormField {form} name="color">
			<FormControl>
				<PageFormLabel
					label={t('eventTypes.dialog.update.form.color.label')}
					description={t('eventTypes.dialog.update.form.color.description')}
				/>
				<ColorPicker bind:value={$formData.color} />
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>

		<FormField {form} name="teams">
			<FormControl let:attrs>
				<PageFormLabel
					label={t('eventTypes.dialog.update.form.teams.label')}
					description={t('eventTypes.dialog.update.form.teams.description')}
				/>
				<div class="max-w-sm">
					<div
						class="border-input bg-background flex h-[154px] w-full flex-col items-start gap-2 overflow-y-auto rounded-md border p-2 focus-within:ring-3 focus-within:ring-blue-600 focus-within:ring-offset-0"
						{...attrs}
					>
						{#each eventTypesStore.availableTeams as team}
							<Button
								variant="secondary"
								class="flex w-[98%] items-center justify-between"
								onclick={() => {
									const isSelected = $formData.teams?.some((t) => t.team_id === team.team_id);

									if (isSelected) {
										$formData.teams = ($formData.teams || []).filter((t) => t.team_id !== team.team_id);
									} else {
										$formData.teams = [
											...($formData.teams || []),
											{ team_id: team.team_id, team_name: team.team_name }
										];
									}
								}}
							>
								<div class="flex items-center justify-center">
									<IconUserGroup additionalClass="w-4 h-4 mr-2" strokeColor="black" />
									<span>{team.team_name}</span>
								</div>
								{#if $formData.teams?.some((t) => t.team_id === team.team_id)}
									<IconCheck additionalClass="w-4 h-4" strokeColor="black" />
								{/if}
							</Button>
						{/each}
					</div>
					<div class="text-muted-foreground mt-2 min-h-[1.5rem] text-sm">
						{#if $formData.teams?.length > 0}
							<div class="hidden md:block">
								Selected: {getTeams({ isMobile: false })}
							</div>
							<div class="block md:hidden">
								Selected: {getTeams({ isMobile: true })}
							</div>
						{:else}
							<span>
								{isDisabled
									? t('eventTypes.dialog.update.form.teams.input.placeholder_disabled')
									: t('eventTypes.dialog.update.form.teams.input.placeholder')}
							</span>
						{/if}
					</div>
				</div>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>
		<PageDialogFooter
			onCancelClick={() => {
				dialogStore.showEventTypesUpdateDialog = false;
				eventTypesStore.resetCurrentEventType();
				form.reset();
			}}
		>
			<Button type="submit" disabled={!$formData.title}
				>{t('eventTypes.dialog.update.form.button.save.label')}</Button
			>
		</PageDialogFooter>
	</form>
</PageDialog>
