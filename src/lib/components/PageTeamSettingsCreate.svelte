<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { superForm } from "sveltekit-superforms";
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { toast } from 'svelte-sonner';

	import FormDescription from './ui/form/form-description.svelte';
	import FormFieldErrors from './ui/form/form-field-errors.svelte';

  const schema = z.object({
    name: z.string().min(3, 'Team name is required and cannot be empty')
  });

  const form = superForm({
		name: ''
  }, {
    validators: zodClient(schema),
    onResult: async (event) => {
      console.log(event.result.type);
    },
    onError: async (event) => {
      toast.error(event.result.error.message);
    }
  });

  const { form: formData, enhance } = form;
  </script>

<form method="POST" action="/api/v1/team-settings/create" class="space-y-4" use:enhance>
  <FormField
    {form}
    name="name">
    <FormControl>
      <Input bind:value={$formData.name} class="text-black focus-visible:ring-blue-600 focus-visible:ring-offset-0" />
    </FormControl>
    <FormDescription>
      This is the name of the team that will be used to identify the team in the system.
    </FormDescription>
    <FormFieldErrors />
  </FormField>
  <Button type="submit" disabled={$formData.name.length < 3}>Create New Team</Button>
</form>
