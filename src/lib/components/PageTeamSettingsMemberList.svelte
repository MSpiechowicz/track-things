<script lang="ts">
	import PageTableSortableHeader from '$lib/components/PageTableSortableHeader.svelte';
	import PageTeamSettingsDeleteDialog from '$lib/components/PageTeamSettingsDeleteDialog.svelte';
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
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';

	const data = $derived(
		teamSettingsOwnerStore.dataFiltered && teamSettingsOwnerStore.dataFiltered.length > 0
			? teamSettingsOwnerStore.dataFiltered
			: teamSettingsOwnerStore.data
	);
</script>

<div class="py-6">
	<h3 class="text-md mb-0 text-white">Member</h3>
	<p class="mb-4 text-sm text-neutral-400">
		Here you can find a list of teams where you are an active member.
	</p>
	<div class="mb-4 flex max-w-sm items-center gap-2">
		<Input
			placeholder="Search"
			oninput={(e) => teamSettingsOwnerStore.filterData((e.target as HTMLInputElement)?.value)}
			class="text-black"
		/>
	</div>
	<Table data-sveltekit-reload>
		<TableHeader>
			<TableRow class="hover:bg-transparent">
				<TableHead class="w-[100px] cursor-default">ID</TableHead>
				<PageTableSortableHeader
					label="Name"
					field="name"
					store={teamSettingsOwnerStore}
					additionalClass="w-50"
				/>
				<PageTableSortableHeader
					label="Joined at"
					field="createdAt"
					store={teamSettingsOwnerStore}
					additionalClass="w-[fit-content]"
				/>
				<TableHead class="w-[100px] cursor-default">Actions</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data as entry, index}
				<TableRow>
					<TableCell>{index + 1}</TableCell>
					<TableCell>{entry.name}</TableCell>
					<TableCell>{new Date(entry.updated_at).toLocaleDateString()}</TableCell>
          <TableCell class="flex gap-2">
						<Button
							variant="destructive"
							size="icon"
							onclick={() => console.log('delete')}
						>
							<IconTrash additionalClass="h-4 w-4 text-white" />
						</Button>
					</TableCell>
				</TableRow>
			{/each}
		</TableBody>
	</Table>
</div>

<PageTeamSettingsDeleteDialog />
