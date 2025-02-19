<script lang="ts">
	import { FormDescription, FormLabel } from '$lib/components/ui/form';

	const { label, description, isTextWhite = false } = $props();
</script>

<FormLabel class="text-md {isTextWhite ? '!text-white' : '!text-black'}">{label}</FormLabel>
{#if description}
	<FormDescription class="mb-4 text-sm text-neutral-400">{description}</FormDescription>
{/if}
