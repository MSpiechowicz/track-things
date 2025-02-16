<script lang="ts">
	import IconSortAscending from '$lib/components/svg/IconSortAscending.svelte';
	import IconSortDescending from '$lib/components/svg/IconSortDescending.svelte';

	const { label, field, store } = $props();
</script>

<div class="flex items-center gap-2">
	{label}
	<Button
		variant="link"
		size="icon"
		class="w-fit cursor-pointer [&>svg]:stroke-neutral-400"
		onclick={() => store.sortData(field)}
	>
		{#if store.currentSort.direction === 'asc'}
			<IconSortAscending />
		{:else}
			<IconSortDescending />
		{/if}
	</Button>
</div>
