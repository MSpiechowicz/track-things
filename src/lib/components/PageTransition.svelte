<script lang="ts">
	import { fly } from 'svelte/transition';

  const { pathname, children } = $props();
	// Use the full pathname as the key for the transition
</script>

{#key pathname}
	<div
		in:fly={{ y: 50, duration: 300, delay: 300 }}
		out:fly={{ y: -50, duration: 300 }}
	>
		{@render children()}
	</div>
{/key}
