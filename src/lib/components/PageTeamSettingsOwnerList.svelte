<script lang="ts">
	import PageTableSortableHeader from '$lib/components/PageTableSortableHeader.svelte';
	import PageTeamSettingsCreateDialog from '$lib/components/PageTeamSettingsCreateDialog.svelte';
	import PageTeamSettingsDeleteDialog from '$lib/components/PageTeamSettingsDeleteDialog.svelte';
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
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { t } from '$lib/translations';

	function handleEdit(id: string, name: string) {
		teamSettingsOwnerStore.currentTeamId = id;
		teamSettingsOwnerStore.currentTeamName = name;
		teamSettingsOwnerStore.showUpdateView = true;
	}

	function handleDelete(id: string, name: string) {
		teamSettingsOwnerStore.currentTeamId = id;
		teamSettingsOwnerStore.currentTeamName = name;
		dialogStore.showTeamSettingsDeleteDialog = true;
	}

	const data = $derived(
		teamSettingsOwnerStore.dataFiltered && teamSettingsOwnerStore.dataFiltered.length > 0
			? teamSettingsOwnerStore.dataFiltered
			: teamSettingsOwnerStore.data
	);
</script>

<div class="py-6">
	<h3 class="text-md mb-0 text-white">{t('teamSettings.ownerList.title')}</h3>
	<p class="mb-4 text-sm text-neutral-400">
		{t('teamSettings.ownerList.description')}
	</p>
	<div class="mb-4 flex max-w-sm items-center gap-2">
		<Input
			placeholder={t('teamSettings.ownerList.input.placeholder')}
			oninput={(e) => teamSettingsOwnerStore.filterData((e.target as HTMLInputElement)?.value)}
			class="text-black"
		/>
	</div>
	<Table data-sveltekit-reload class="max-w-full">
		<TableHeader>
			<TableRow class="hover:bg-transparent">
				<TableHead class="w-[100px] cursor-default">
					{t('teamSettings.ownerList.table.id.label')}
				</TableHead>
				<PageTableSortableHeader
					label={t('teamSettings.ownerList.table.name.label')}
					field="name"
					store={teamSettingsOwnerStore}
					additionalClass="w-50"
				/>
				<PageTableSortableHeader
					label={t('teamSettings.ownerList.table.members.label')}
					field="members"
					store={teamSettingsOwnerStore}
					additionalClass="w-[fit-content] hidden md:table-cell"
				/>
				<PageTableSortableHeader
					label={t('teamSettings.ownerList.table.createdAt.label')}
					field="createdAt"
					store={teamSettingsOwnerStore}
					additionalClass="w-[fit-content] hidden md:table-cell"
				/>
				<TableHead class="w-[100px] cursor-default">
					{t('teamSettings.ownerList.table.actions.label')}
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data as entry, index}
				<TableRow>
					<TableCell>{index + 1}</TableCell>
					<TableCell>{entry.name}</TableCell>
					<TableCell class="hidden md:table-cell">{entry.members}</TableCell>
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
				{t('teamSettings.ownerList.noData.label')}
			</p>
		</div>
	{/if}
	<div class="mt-4 flex items-center gap-4">
		<Button
			variant="default"
			class="py-5"
			onclick={() => {
				dialogStore.showTeamSettingsCreateDialog = true;
			}}
		>
			<IconPlus additionalClass="!h-5 !w-5" />
			{t('teamSettings.ownerList.button.add.label')}
		</Button>
	</div>
</div>

<PageTeamSettingsCreateDialog />
<PageTeamSettingsDeleteDialog />
