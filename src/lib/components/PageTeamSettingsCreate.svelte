<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors, FormLabel } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
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
						teamSettingsOwnerStore.data.push({
							id: event.result.data?.id,
							name: event.result.data?.name,
							created_at: event.result.data?.created_at,
							updated_at: event.result.data?.updated_at,
							members: [],
							tracking_ids: []
						});

            if (teamSettingsOwnerStore.data?.length > 0) {
              teamSettingsOwnerStore.showCreateView = false;
              dashboardStore.isChildView = false;
            }

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

  $effect(() => {
    if (teamSettingsOwnerStore.data?.length > 0) {
      dashboardStore.isChildView = true;
      dashboardStore.goBack = () => {
        teamSettingsOwnerStore.showCreateView = false;
        dashboardStore.isChildView = false;
      };
    }
  });
</script>

<div class="max-w-[80ch]">
	<h2 class="mt-6 text-xl font-medium">Create New Team</h2>
	<p class="text-sm text-neutral-400">
		Please fill out the required fields below in order to create a new team.
	</p>
	<form
		method="POST"
		action="/api/v1/team-settings/create"
		class="mt-4 space-y-4"
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
						: 'ring-0 ring-blue-600'}"
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
