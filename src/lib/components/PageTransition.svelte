<script lang="ts">
	import { fade } from 'svelte/transition';

  const { pathname, children } = $props();
	// Use the full pathname as the key for the transition
</script>

{#key pathname}
	<div
  in:fade={{
    delay: 0,
    duration: 300,
  }}
	>
		{@render children()}
	</div>
{/key}
