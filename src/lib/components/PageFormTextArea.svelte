<script lang="ts">
	import { Textarea } from '$lib/components/ui/textarea';

	let { attrs, value = $bindable(), placeholder = '' } = $props();
</script>

<Textarea
	bind:value={value}
	class="text-md max-w-sm text-black focus-visible:ring-blue-600 focus-visible:ring-offset-0 resize-none"
	placeholder={placeholder}
	autocomplete="off"
	{...attrs}
/>
