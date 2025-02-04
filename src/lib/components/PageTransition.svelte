<script lang="ts">
	import { fade } from 'svelte/transition';

	const { pathname, children } = $props();
	// Use the full pathname as the key for the transition
</script>

{#key pathname}
	<div
		in:fade={{ duration: 150, delay: 0 }}
    class="flex flex-1 items-center"
	>
		{@render children()}
	</div>
{/key}
