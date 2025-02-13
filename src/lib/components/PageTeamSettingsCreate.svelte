<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		FormControl,
		FormDescription,
		FormField,
		FormFieldErrors
	} from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';

	const schema = z.object({
		name: z.string().min(3, 'Team name is required, and must be at least 3 characters long')
	});

	const form = superForm(
		{
			name: ''
		},
		{
			validators: zodClient(schema),
			onResult: async (event) => {
				console.log(event.result.type);
			},
			onError: async (event) => {
				toast.error(event.result.error.message);
			}
		}
	);

	const { form: formData, enhance } = form;
</script>

<div class="max-w-[80ch]">
	<h2 class="mt-6 text-xl font-medium">Create New Team</h2>
	<p class="text-sm text-neutral-400">
		Before you can start using the Team Settings, you need to first create a new team. Please fill
		out the required fields below.
	</p>
	<form method="POST" action="/api/v1/team-settings/create" class="mt-12 space-y-4" use:enhance>
		<FormField {form} name="name">
			<FormControl>
				<Label for="name">Team Name</Label>
				<Input
					id="name"
					bind:value={$formData.name}
					class="mt-1 text-black focus-visible:ring-{$formData.name.length >= 3
						? 'blue-600'
						: 'red-500'} focus-visible:ring-offset-0 {$formData.name.length < 3
						? 'ring-2 ring-red-500'
						: ''}"
					placeholder="Enter team name"
					autocomplete="off"
				/>
			</FormControl>
			<FormDescription>
				This is the name of the team that will be used to identify the team in the system.
			</FormDescription>
			<FormFieldErrors class="text-red-500" />
		</FormField>
		<Button type="submit" disabled={$formData.name.length < 3}>Create New Team</Button>
	</form>
</div>
