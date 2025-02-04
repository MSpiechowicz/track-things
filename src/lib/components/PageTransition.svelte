<script lang="ts">
	import { fade } from 'svelte/transition';

	const { pathname, children } = $props();
	// Use the full pathname as the key for the transition
</script>

{#key pathname}
	<div
		in:fade={{ duration: 150, delay: 150 }}
		out:fade={{ duration: 150 }}
	>
		{@render children()}
	</div>
{/key}
