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
	import IconTrash from '$lib/components/svg/IconTrash.svelte';

	function handleEdit(id: number) {
		// Implement edit functionality
		console.log('Edit team setting:', id);
	}
</script>

<div class="py-6">
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead class="w-[100px]">ID</TableHead>
				<TableHead>Name</TableHead>
				<TableHead>Last Updated</TableHead>
				<TableHead class="w-[100px]">Actions</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each teamSettingsStore.data as entry, index}
				<TableRow>
					<TableCell>{index + 1}</TableCell>
					<TableCell>{entry.name}</TableCell>
					<TableCell>{new Date(entry.updated_at).toLocaleDateString()}</TableCell>
					<TableCell class="flex gap-2">
						<Button variant="secondary" size="icon" onclick={() => {
							teamSettingsStore.updateTeamSettingId = entry.id;
							teamSettingsStore.updateTeamSettingName = entry.name;
              teamSettingsStore.updateView = true;
						}} data-sveltekit-reload>
							<IconPencil additionalClass="h-4 w-4" strokeColor="black" />
						</Button>
						<Button
							variant="destructive"
							size="icon"
							onclick={() => {
								teamSettingsStore.deleteTeamSettingId = entry.id;
								teamSettingsStore.deleteTeamSettingName = entry.name;
								dialogStore.showTeamSettingsDelete = true;
							}}
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
