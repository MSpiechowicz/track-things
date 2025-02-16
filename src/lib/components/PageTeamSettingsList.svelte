<script lang="ts">
	import { Button } from '$lib/components/ui/button';
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

	import PageTeamSettingsDeleteDialog from '$lib/components/PageTeamSettingsDeleteDialog.svelte';
	import IconPencil from '$lib/components/svg/IconPencil.svelte';
	import IconPlus from '$lib/components/svg/IconPlus.svelte';
	import IconSortAscending from '$lib/components/svg/IconSortAscending.svelte';
	import IconSortDescending from '$lib/components/svg/IconSortDescending.svelte';
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

	function handleSort(field: 'name' | 'members' | 'createdAt') {
		teamSettingsStore.sortData(field);
	}

  function getSortStatus(): 'asc' | 'desc' {
    return teamSettingsStore.currentSort.direction;
  }
</script>

<div class="py-6">
	<p class="mb-4 text-sm text-neutral-400">
		Here you can manage each of the team settings and its members.
	</p>
	<Table data-sveltekit-reload>
		<TableHeader>
			<TableRow class="hover:bg-transparent">
				<TableHead class="w-[100px] cursor-default">ID</TableHead>
				<TableHead class="cursor-default">
					<div class="flex items-center gap-2">
						Name
						<Button
							variant="link"
							size="icon"
							class="w-fit [&>svg]:stroke-neutral-400 cursor-pointer"
							onclick={() => handleSort('name')}
						>
            {#if getSortStatus() === 'asc'}
              <IconSortAscending />
            {:else}
              <IconSortDescending />
            {/if}
						</Button>
					</div>
				</TableHead>
				<TableHead class="cursor-default">
					<div class="flex items-center gap-2">
						Members
						<Button
							variant="link"
							size="icon"
							class="w-fit [&>svg]:stroke-neutral-400 cursor-pointer"
							onclick={() => handleSort('members')}
						>
              {#if getSortStatus() === 'asc'}
                <IconSortAscending />
              {:else}
                <IconSortDescending />
              {/if}
						</Button>
					</div>
				</TableHead>
				<TableHead class="cursor-default">
					<div class="flex items-center gap-2">
						Date Created
						<Button
							variant="link"
							size="icon"
							class="w-fit [&>svg]:stroke-neutral-400 cursor-pointer"
							onclick={() => handleSort('createdAt')}
						>
              {#if getSortStatus() === 'asc'}
                <IconSortAscending />
              {:else}
                <IconSortDescending />
              {/if}
						</Button>
					</div>
				</TableHead>
				<TableHead class="w-[100px] cursor-default">Actions</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each teamSettingsStore.data as entry, index}
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
