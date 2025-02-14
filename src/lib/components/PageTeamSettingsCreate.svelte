<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { teamSettingsStore } from '$lib/stores/teamSettingsStore.svelte';
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
				switch (event.result.type) {
					case 'success':
						teamSettingsStore.data.push({
							id: event.result.data?.id,
							name: event.result.data?.name,
							updated_at: event.result.data?.updated_at
						});

						toast.success('Success', {
							description: 'Your team has been created successfully.'
						});
						break;
					case 'failure':
						toast.error('Error', {
							description: 'We were unable to create your team. Please try again.'
						});
						break;
				}
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<div class="max-w-[80ch]">
	<h2 class="mt-6 text-xl font-medium">Create New Team</h2>
	<p class="text-sm text-neutral-400">
		Please fill out the required fields below in order to create a new team.
	</p>
	<form
		method="POST"
		action="/api/v1/team-settings/create"
		class="mt-6 space-y-8"
		use:enhance
		data-sveltekit-reload
	>
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
		<Button type="submit" disabled={$formData.name.length < 3}>Create New Team</Button>
	</form>
</div>
