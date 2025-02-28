<script lang="ts">
	import PageEventTypesCreateDialog from '$lib/components/PageEventTypesCreateDialog.svelte';
	import PageEventTypesDeleteDialog from '$lib/components/PageEventTypesDeleteDialog.svelte';
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
	import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
	import { t } from '$lib/translations';

	function handleEdit(id: string, title: string, color: string, teams: { id: string; name: string }[]) {
		eventTypesStore.currentEventTypeId = id;
		eventTypesStore.currentEventTypeTitle = title;
		eventTypesStore.currentEventTypeColor = color;
		eventTypesStore.currentEventTypeTeams = teams;

		dialogStore.showEventTypesCreateDialog = true;
	}

	function handleDelete(id: string, title: string, color: string, teams: { id: string; name: string }[]) {
		eventTypesStore.currentEventTypeId = id;
		eventTypesStore.currentEventTypeTitle = title;
		eventTypesStore.currentEventTypeColor = color;
		eventTypesStore.currentEventTypeTeams = teams;

		dialogStore.showEventTypesDeleteDialog = true;
	}

	const data = $derived(
		eventTypesStore.dataFiltered && eventTypesStore.dataFiltered.length > 0
			? eventTypesStore.dataFiltered
			: eventTypesStore.data
	);
</script>

<div class="py-6">
	<h3 class="text-md mb-0 text-white">{t('eventTypes.list.title')}</h3>
	<p class="mb-4 text-sm text-neutral-400">
		{t('eventTypes.list.description')}
	</p>
	<div class="mb-4 flex max-w-sm items-center gap-2">
		<Input
			placeholder={t('eventTypes.list.input.placeholder')}
			oninput={(e) => eventTypesStore.filterData((e.target as HTMLInputElement)?.value)}
			class="text-black"
		/>
	</div>
	<Table data-sveltekit-reload class="max-w-full">
		<TableHeader>
			<TableRow class="hover:bg-transparent">
				<TableHead class="w-[100px] cursor-default">
					{t('eventTypes.list.table.id.label')}
				</TableHead>
				<PageTableSortableHeader
					label={t('eventTypes.list.table.title.label')}
					field="title"
					store={eventTypesStore}
					additionalClass="w-50"
				/>
				<PageTableSortableHeader
					label={t('eventTypes.list.table.color.label')}
					field="color"
					store={eventTypesStore}
					additionalClass="w-[fit-content] hidden md:table-cell"
				/>
				<TableHead class="hidden w-[fit-content] md:table-cell">
					{t('eventTypes.list.table.teams.label')}
				</TableHead>
				<PageTableSortableHeader
					label={t('eventTypes.list.table.createdAt.label')}
					field="created_at"
					store={eventTypesStore}
					additionalClass="w-[fit-content] hidden md:table-cell"
				/>
				<PageTableSortableHeader
					label={t('eventTypes.list.table.updatedAt.label')}
					field="updated_at"
					store={eventTypesStore}
					additionalClass="w-[fit-content] hidden md:table-cell"
				/>
				<TableHead class="w-[100px] cursor-default">
					{t('eventTypes.list.table.actions.label')}
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data as entry, index}
				<TableRow>
					<TableCell>{index + 1}</TableCell>
					<TableCell>{entry.title}</TableCell>
					<TableCell>{entry.color}</TableCell>
					<TableCell class="hidden md:table-cell">{entry.teams.map((team) => team.name).join(', ')}</TableCell>
					<TableCell class="hidden md:table-cell"
						>{new Date(entry.created_at).toLocaleDateString()}</TableCell
					>
					<TableCell class="hidden md:table-cell"
						>{new Date(entry.updated_at).toLocaleDateString()}</TableCell
					>
					<TableCell class="flex gap-2">
						<Button
							variant="secondary"
							size="icon"
							onclick={() => handleEdit(entry.id, entry.title, entry.color, entry.teams)}
						>
							<IconPencil additionalClass="h-4 w-4" strokeColor="black" />
						</Button>
						<Button
							variant="destructive"
							size="icon"
							onclick={() => handleDelete(entry.id, entry.title, entry.color, entry.teams)}
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
				{t('eventTypes.list.noData.label')}
			</p>
		</div>
	{/if}
	<div class="mt-4 flex items-center gap-4">
		<Button
			variant="default"
			class="py-5"
			onclick={() => {
				dialogStore.showEventTypesCreateDialog = true;
			}}
		>
			<IconPlus additionalClass="!h-5 !w-5" />
			{t('eventTypes.list.button.add.label')}
		</Button>
	</div>
</div>

<PageEventTypesCreateDialog />
<PageEventTypesDeleteDialog />
