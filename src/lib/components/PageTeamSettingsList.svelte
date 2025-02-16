<script lang="ts">
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
	import { teamSettingsStore } from '$lib/stores/teamSettingsStore.svelte';

	import PageTableSortableHeader from '$lib/components/PageTableSortableHeader.svelte';
	import PageTeamSettingsDeleteDialog from '$lib/components/PageTeamSettingsDeleteDialog.svelte';
	import IconPencil from '$lib/components/svg/IconPencil.svelte';
	import IconPlus from '$lib/components/svg/IconPlus.svelte';
	import IconTrash from '$lib/components/svg/IconTrash.svelte';

	function handleEdit(id: string, name: string) {
		teamSettingsStore.currentTeamId = id;
		teamSettingsStore.currentTeamName = name;
		teamSettingsStore.showUpdateView = true;
	}

	function handleDelete(id: string, name: string) {
		teamSettingsStore.currentTeamId = id;
		teamSettingsStore.currentTeamName = name;
		dialogStore.showTeamSettingsDeleteDialog = true;
	}

	const data = $derived(
		teamSettingsStore.dataFiltered && teamSettingsStore.dataFiltered.length > 0
			? teamSettingsStore.dataFiltered
			: teamSettingsStore.data
	);
</script>

<div class="py-6">
	<h3 class="text-md mb-0 text-white">Owner</h3>
	<p class="mb-4 text-sm text-neutral-400">
		Here you can find a list of all the teams you have created. As an owner, you can manage each of
		the individual team settings and its corresponding members.
	</p>
	<div class="mb-4 flex max-w-sm items-center gap-2">
		<Input
			placeholder="Search"
			oninput={(e) => teamSettingsStore.filterData((e.target as HTMLInputElement)?.value)}
			class="text-black"
		/>
	</div>
	<Table data-sveltekit-reload>
		<TableHeader>
			<TableRow class="hover:bg-transparent">
				<TableHead class="w-[100px] cursor-default">ID</TableHead>
				<PageTableSortableHeader label="Name" field="name" store={teamSettingsStore} />
				<PageTableSortableHeader label="Members" field="members" store={teamSettingsStore} />
				<PageTableSortableHeader label="Date Created" field="createdAt" store={teamSettingsStore} />
				<TableHead class="w-[100px] cursor-default">Actions</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data as entry, index}
				<TableRow>
					<TableCell>{index + 1}</TableCell>
					<TableCell>{entry.name}</TableCell>
					<TableCell>{entry.members?.length ?? 0}</TableCell>
					<TableCell>{new Date(entry.updated_at).toLocaleDateString()}</TableCell>
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

	<div class="mt-4 flex items-center gap-4">
		<Button
			variant="default"
			class="border-1 py-5"
			onclick={() => {
				teamSettingsStore.showCreateView = true;
			}}
		>
			<IconPlus additionalClass="!h-5 !w-5" />
			Add Team
		</Button>
	</div>
</div>

<PageTeamSettingsDeleteDialog />
