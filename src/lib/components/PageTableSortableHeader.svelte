<script lang="ts">
	import IconSortAscending from '$lib/components/svg/IconSortAscending.svelte';
	import IconSortDescending from '$lib/components/svg/IconSortDescending.svelte';
	import { Button } from '$lib/components/ui/button';
	import { TableHead } from '$lib/components/ui/table';
	import type { TableSortableDataType } from '$lib/types/tableSortableDataType';

	const { label, field, store, additionalClass } = $props<{
		label: string;
		field: string;
		store: TableSortableDataType;
		additionalClass?: string;
	}>();
</script>

<TableHead class="cursor-default {additionalClass}">
	<div class="flex items-center gap-2">
		{label}
		<Button
			variant="link"
			size="icon"
			class="w-fit cursor-pointer [&>svg]:stroke-neutral-400"
			onclick={() => store.sortData(field)}
		>
			{#if store.dataSorted.direction === 'asc'}
				<IconSortAscending />
			{:else}
				<IconSortDescending />
			{/if}
		</Button>
	</div>
</TableHead>
