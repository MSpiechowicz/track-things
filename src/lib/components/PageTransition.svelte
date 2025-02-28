<script lang="ts">
	import { fade } from 'svelte/transition';

	const { pathname, children } = $props();
</script>

{#if pathname.includes('dashboard')}
	<div class="flex h-full w-full flex-1">
		{@render children()}
	</div>
{:else}
	{#key pathname}
		<div in:fade={{ duration: 150, delay: 0 }} class="flex h-full w-full flex-1">
			{@render children()}
		</div>
	{/key}
{/if}
