<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { teamSettingsStore } from '$lib/stores/teamSettingsStore.svelte';
	import { teamSettingsUpdateSchemaValidator } from '$lib/validators/teamSettingsUpdateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	const form = superForm(
		{
			id: teamSettingsStore.updateTeamSettingId ?? '',
			name: teamSettingsStore.updateTeamSettingName ?? ''
		},
		{
			validators: teamSettingsUpdateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result.type;

				if (eventType === 'success') {
					const existingIndex = teamSettingsStore.data.findIndex(
						// @ts-expect-error - data is present
						(item) => item.id === event.result.data?.id
					);

					if (existingIndex !== -1) {
						teamSettingsStore.data[existingIndex] = {
							id: event.result.data?.id,
							name: event.result.data?.name,
							updated_at: event.result.data?.updated_at
						};
					} else {
						teamSettingsStore.data.push({
							id: event.result.data?.id,
							name: event.result.data?.name,
							updated_at: event.result.data?.updated_at
						});
					}

					teamSettingsStore.updateView = false;

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
		$formData.name = teamSettingsStore.updateTeamSettingName ?? '';
		$formData.id = teamSettingsStore.updateTeamSettingId ?? '';
	});
</script>

<div class="max-w-[80ch]">
	<h2 class="mt-6 text-xl font-medium">Edit Team</h2>
	<p class="text-sm text-neutral-400">
		Please fill out the required fields below in order to update your team.
	</p>
	<form
		method="POST"
		action="/api/v1/team-settings/update"
		class="mt-6 space-y-8"
		use:enhance
		id="update-team-form"
		data-sveltekit-reload
	>
		<input type="hidden" name="id" value={teamSettingsStore.updateTeamSettingId ?? ''} />
		<FormField {form} name="name" let:errors>
			<FormControl let:attrs>
				<FormLabel class={errors.length > 0 ? '!text-red-500' : ''}>Team Name</FormLabel>
				<Input
					bind:value={$formData.name}
					class="text-md mt-1 max-w-sm text-black focus-visible:{errors.length > 0
						? 'ring-red-500'
						: 'ring-blue-600'} focus-visible:ring-offset-0 {errors.length > 0
						? 'ring-2 ring-red-500'
						: 'ring-2 ring-blue-600'}"
					placeholder="Enter team name"
					autocomplete="off"
					{...attrs}
				/>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>
		<div class="flex flex-row items-center gap-2">
			<Button
				variant="secondary"
				onclick={() => {
					teamSettingsStore.updateView = false;
				}}
			>
				Cancel
			</Button>
			<Button type="submit" disabled={$formData?.name?.length < 3}>Update Team</Button>
		</div>
	</form>
</div>
