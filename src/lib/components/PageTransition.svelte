<script lang="ts">
	import { fade } from 'svelte/transition';

	const { pathname, children } = $props();
</script>

{#key pathname}
	<div
		in:fade={{ duration: 150, delay: 0 }}
    class="flex flex-1 w-full h-full"
	>
		{@render children()}
	</div>
{/key}
