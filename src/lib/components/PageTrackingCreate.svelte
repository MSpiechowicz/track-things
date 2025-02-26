<script lang="ts">
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { trackingStore } from '$lib/stores/trackingStore.svelte';
	import { t } from '$lib/translations';
	import { trackingCreateTimer } from '$lib/utils/timers/defaults';
	import { trackingCreateSchemaValidator } from '$lib/validators/trackingCreateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import PageFormInput from './PageFormInput.svelte';
	import PageFormLabel from './PageFormLabel.svelte';
	import PageFormTextArea from './PageFormTextArea.svelte';
	import PageSpinner from './PageSpinner.svelte';
	import IconDeviceFloppy from './svg/IconDeviceFloppy.svelte';
	import { Button } from './ui/button';
	import { FormControl, FormField, FormFieldErrors } from './ui/form';
	import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

	const form = superForm(
		{
			id: trackingStore.currentTrackingId ?? '',
			name: trackingStore.currentTrackingName ?? '',
			type: trackingStore.currentTrackingType ?? '',
			description: trackingStore.currentTrackingDescription ?? ''
		},
		{
			validators: trackingCreateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result.type;

				if (eventType === 'success') {
					const index = trackingStore.data.findIndex(
						// @ts-expect-error - data is present
						(item) => item.id === event.result.data?.id
					);

					trackingStore.data[index] = {
						id: event.result.data?.id,
						name: event.result.data?.name,
						created_at: event.result.data?.created_at,
						updated_at: event.result.data?.updated_at,
						type: event.result.data?.type,
						description: event.result.data?.description
					};

					// Update the current team name
					trackingStore.currentTrackingName = event.result.data?.name;

					// Reset the form
					form.reset({
						id: event.result.data?.id ?? '',
						// @ts-expect-error - This is a valid type
						name: event.result.data?.name ?? '',
						type: 'calendar_event'
					});

					toast.success(t('tracking.create.toast.success.title'), {
						description: t('tracking.create.toast.success.description')
					});
				} else {
					toast.error(t('tracking.create.toast.error.title'), {
						description: t('tracking.create.toast.error.description')
					});
				}
			}
		}
	);

	const { form: formData, enhance } = form;

	$effect(() => {
		trackingCreateTimer.start();

		dashboardStore.isChildView = true;
		dashboardStore.goBack = () => {
			trackingStore.showCreateView = false;
			dashboardStore.isChildView = false;
		};
	});
</script>

{#if trackingCreateTimer.isRunning}
	<div class="mt-8">
		<PageSpinner additionalClass="w-10 h-10" />
	</div>
{:else}
	<div class="flex flex-1 flex-col">
		<form
			method="POST"
			action="/api/v1/tracking/update"
			class="mt-6 w-full space-y-8"
			use:enhance
			id="create-tracking-form"
			data-sveltekit-reload
		>
			<input type="hidden" name="id" value={trackingStore.currentTrackingId ?? ''} />
			<input type="hidden" name="type" bind:value={$formData.type} />

			<FormField {form} name="name" let:errors>
				<FormControl let:attrs>
					<PageFormLabel
						label={t('tracking.create.form.name.label')}
						description={t('tracking.create.form.name.description')}
						isTextWhite={true}
					/>
					<PageFormInput
						bind:value={$formData.name}
						{errors}
						{attrs}
						placeholder={t('tracking.create.form.name.input.placeholder')}
					/>
				</FormControl>
				<FormFieldErrors class="text-red-500" />
			</FormField>

			<FormField {form} name="type">
				<FormControl let:attrs>
					<PageFormLabel
						label={t('tracking.create.form.type.label')}
						description={t('tracking.create.form.type.description')}
						isTextWhite={true}
					/>
					<div class="max-w-sm">
						<Select onSelectedChange={(v) => v && ($formData.type = v.value as string)}>
							<SelectTrigger {...attrs}>
								<SelectValue placeholder={t('tracking.create.form.type.input.placeholder')} />
							</SelectTrigger>
							<SelectContent class="text-black">
								<SelectItem class="text-md" value="calendar_event"
									>{t('tracking.create.form.type.option.calendar_event')}</SelectItem
								>
							</SelectContent>
						</Select>
					</div>
				</FormControl>
				<FormFieldErrors class="text-red-500" />
			</FormField>

			<FormField {form} name="description">
				<FormControl let:attrs>
					<PageFormLabel
						label={t('tracking.create.form.description.label')}
						description={t('tracking.create.form.description.description')}
						isTextWhite={true}
					/>
					<PageFormTextArea
						bind:value={$formData.description}
						placeholder={t('tracking.create.form.description.input.placeholder')}
						{attrs}
					/>
				</FormControl>
				<FormFieldErrors class="text-red-500" />
			</FormField>

			<div class="flex flex-row items-center gap-2">
				<Button type="submit" variant="default" class="py-5 text-white">
					<IconDeviceFloppy additionalClass="w-5 h-5" />
					{t('tracking.create.form.button.save.label')}
				</Button>
			</div>
		</form>
	</div>
{/if}
