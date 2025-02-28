<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import PageFormInput from '$lib/components/PageFormInput.svelte';
	import PageFormLabel from '$lib/components/PageFormLabel.svelte';
	import { Button } from '$lib/components/ui/button';
	import ColorPicker from '$lib/components/ui/color-picker/color-picker.svelte';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
	import { t } from '$lib/translations';
	import { eventTypesTimer, eventTypesUpdateTimer } from '$lib/utils/timers/defaults';
	import { eventTypesUpdateSchemaValidator } from '$lib/validators/eventTypesUpdateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import PageSpinner from './PageSpinner.svelte';
	import IconCheck from './svg/IconCheck.svelte';
	import IconDeviceFloppy from './svg/IconDeviceFloppy.svelte';
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
			validators: eventTypesUpdateSchemaValidator,
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
					eventTypesStore.showUpdateView = false;

					dashboardStore.resetViews();

					form.reset();

					eventTypesTimer.reset();

					invalidateAll();

					toast.success(t('eventTypes.update.toast.success.title'), {
						description: t('eventTypes.update.toast.success.description')
					});
				} else {
					toast.error(t('eventTypes.update.toast.error.title'), {
						description: t('eventTypes.update.toast.error.description')
					});
				}
			}
		}
	);

	const { form: formData, enhance } = form;

	const isDisabled = $derived(eventTypesStore.availableTeams.length === 0);

	$effect(() => {
		$formData.id = eventTypesStore.currentEventTypeId ?? '';
		$formData.title = eventTypesStore.currentEventTypeTitle ?? '';
		$formData.color = eventTypesStore.currentEventTypeColor ?? '';
		$formData.teams = eventTypesStore.currentEventTypeTeams ?? [];

		dashboardStore.isChildView = true;
		dashboardStore.goBack = () => {
			eventTypesStore.showUpdateView = false;
			dashboardStore.isChildView = false;
		};

		eventTypesUpdateTimer.start();
	});
</script>

{#if eventTypesUpdateTimer.isRunning}
	<div class="mt-8">
		<PageSpinner additionalClass="w-10 h-10" />
	</div>
{:else}
	<form
		method="POST"
		action="/api/v1/event-types/update"
		class="mt-6 space-y-6"
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
					label={t('eventTypes.update.form.title.label')}
					description={t('eventTypes.update.form.title.description')}
					isTextWhite={true}
				/>
				<PageFormInput
					bind:value={$formData.title}
					{errors}
					{attrs}
					placeholder={t('eventTypes.update.form.title.input.placeholder')}
				/>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>

		<FormField {form} name="color">
			<FormControl>
				<PageFormLabel
					label={t('eventTypes.update.form.color.label')}
					description={t('eventTypes.update.form.color.description')}
					isTextWhite={true}
				/>
				<ColorPicker bind:value={$formData.color} />
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>

		<FormField {form} name="teams">
			<FormControl let:attrs>
				<PageFormLabel
					label={t('eventTypes.update.form.teams.label')}
					description={t('eventTypes.update.form.teams.description')}
					isTextWhite={true}
				/>
				<div class="max-w-sm">
					<div
						class="border-input bg-background flex w-full flex-col items-start gap-2 rounded-md border p-4 focus-within:ring-3 focus-within:ring-blue-600 focus-within:ring-offset-0"
						{...attrs}
					>
						{#if isDisabled}
							<span class="text-muted-foreground">
								{t('eventTypes.update.form.teams.input.placeholder_disabled')}
							</span>
						{:else}
							{#each eventTypesStore.availableTeams as team}
								<Button
									variant="secondary"
									class="bg-custom-dark hover:bg-custom-dark/80 flex w-full items-center justify-between"
									onclick={() => {
										const isSelected = $formData.teams?.some((t) => t.team_id === team.team_id);

										if (isSelected) {
											$formData.teams = ($formData.teams || []).filter(
												(t) => t.team_id !== team.team_id
											);
										} else {
											$formData.teams = [
												...($formData.teams || []),
												{ team_id: team.team_id, team_name: team.team_name }
											];
										}
									}}
								>
									<div class="flex items-center justify-center">
										<IconUserGroup additionalClass="w-4 h-4 mr-2" strokeColor="white" />
										<span class="text-white">{team.team_name}</span>
									</div>
									{#if $formData.teams?.some((t) => t.team_id === team.team_id)}
										<IconCheck additionalClass="w-4 h-4" strokeColor="white" />
									{/if}
								</Button>
							{/each}
						{/if}
					</div>
				</div>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>
		<Button type="submit" disabled={!$formData.title} class="mt-4 mb-8">
			<IconDeviceFloppy additionalClass="w-4 h-4" />
			{t('eventTypes.update.form.button.save.label')}</Button
		>
	</form>
{/if}
