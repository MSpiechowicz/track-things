<script lang="ts">
	import { Input } from '$lib/components/ui/input';

	let { errors, attrs, value = $bindable(), placeholder = '' } = $props();
</script>

<Input
	bind:value={value}
	class="text-md max-w-sm text-black focus-visible:{errors.length > 0
		? 'ring-red-500'
		: 'ring-blue-600'} focus-visible:ring-offset-0 {errors.length > 0
		? 'ring-2 ring-red-500'
		: 'ring-0 ring-blue-600'}"
	placeholder={placeholder}
	autocomplete="off"
	{...attrs}
/>
