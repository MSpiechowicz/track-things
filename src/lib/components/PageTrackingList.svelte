<script lang="ts">
	import PageTableSortableHeader from '$lib/components/PageTableSortableHeader.svelte';
	import IconPencil from '$lib/components/svg/IconPencil.svelte';
	import IconPlus from '$lib/components/svg/IconPlus.svelte';
	import IconTrash from '$lib/components/svg/IconTrash.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { trackingStore } from '$lib/stores/trackingStore.svelte';
	import { t } from '$lib/translations';

	function handleEdit(id: string, name: string) {
		trackingStore.currentTrackingId = id;
		trackingStore.currentTrackingName = name;
		trackingStore.showUpdateView = true;
	}

	function handleDelete(id: string, name: string) {
		trackingStore.currentTrackingId = id;
		trackingStore.currentTrackingName = name;
		dialogStore.showTrackingDeleteDialog = true;
	}

	const data = $derived(
		trackingStore.dataFiltered && trackingStore.dataFiltered.length > 0
			? trackingStore.dataFiltered
			: trackingStore.data
	);
</script>

<div class="py-6">
	<h3 class="text-md mb-0 text-white">{t('tracking.list.table.title')}</h3>
	<p class="mb-4 text-sm text-neutral-400">
		{t('tracking.list.table.description')}
	</p>
	<div class="mb-4 flex max-w-sm items-center gap-2">
		<Input
			placeholder={t('tracking.list.table.input.placeholder')}
			oninput={(e) => trackingStore.filterData((e.target as HTMLInputElement)?.value)}
			class="text-black"
		/>
	</div>
	<Table data-sveltekit-reload class="max-w-full">
		<TableHeader>
			<TableRow class="hover:bg-transparent">
				<TableHead class="w-[100px] cursor-default">
					{t('tracking.list.table.id.label')}
				</TableHead>
				<PageTableSortableHeader
					label={t('tracking.list.table.name.label')}
					field="name"
					store={trackingStore}
					additionalClass="w-50"
				/>
				<PageTableSortableHeader
					label={t('tracking.list.table.createdAt.label')}
					field="createdAt"
					store={trackingStore}
					additionalClass="w-[fit-content] hidden md:table-cell"
				/>
        <PageTableSortableHeader
					label={t('tracking.list.table.updatedAt.label')}
					field="updatedAt"
					store={trackingStore}
					additionalClass="w-[fit-content] hidden md:table-cell"
				/>
				<TableHead class="w-[100px] cursor-default">
					{t('tracking.list.table.actions.label')}
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data as entry, index}
				<TableRow>
					<TableCell>{index + 1}</TableCell>
					<TableCell>{entry.name}</TableCell>
					<TableCell class="hidden md:table-cell">{new Date(entry.created_at).toLocaleDateString()}</TableCell>
					<TableCell class="hidden md:table-cell">{new Date(entry.updated_at).toLocaleDateString()}</TableCell>
					<TableCell class="flex gap-2">
						<Button
							variant="secondary"
							size="icon"
							onclick={() => handleEdit(entry.id, entry.name)}
						>
							<IconPencil additionalClass="h-4 w-4" strokeColor="black" />
						</Button>
						<Button
							variant="destructive"
							size="icon"
							onclick={() => handleDelete(entry.id, entry.name)}
						>
							<IconTrash additionalClass="h-4 w-4 text-white" />
						</Button>
					</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
	{#if !data || data.length === 0}
		<div class="flex h-[68.5px] w-full items-center justify-center">
			<p class="text-sm text-neutral-400">
				{t('tracking.list.noData.label')}
			</p>
		</div>
	{/if}
	<div class="mt-4 flex items-center gap-4">
		<Button
			variant="default"
			class="py-5"
			onclick={() => {
				trackingStore.showCreateView = true;
			}}
		>
			<IconPlus additionalClass="!h-5 !w-5" />
			{t('tracking.list.button.add.label')}
		</Button>
	</div>
</div>
