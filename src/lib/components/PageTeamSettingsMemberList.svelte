<script lang="ts">
	import PageTableSortableHeader from '$lib/components/PageTableSortableHeader.svelte';
	import PageTeamSettingsMemberDeleteDialog from '$lib/components/PageTeamSettingsMemberDeleteDialog.svelte';
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
	import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
	import { t } from '$lib/translations';

	const data = $derived(
		teamSettingsMemberStore.dataFiltered && teamSettingsMemberStore.dataFiltered.length > 0
			? teamSettingsMemberStore.dataFiltered
			: teamSettingsMemberStore.data
	);
</script>

<div class="py-6">
	<h3 class="text-md mb-0 text-white">{t('teamSettings.memberList.title')}</h3>
	<p class="mb-4 text-sm text-neutral-400">
		{t('teamSettings.memberList.description')}
	</p>
	<div class="mb-4 flex max-w-sm items-center gap-2">
		<Input
			placeholder={t('teamSettings.memberList.input.placeholder')}
			oninput={(e) => teamSettingsMemberStore.filterData((e.target as HTMLInputElement)?.value)}
			class="text-black"
		/>
	</div>
	<Table data-sveltekit-reload>
		<TableHeader>
			<TableRow class="hover:bg-transparent">
				<TableHead class="w-[100px] cursor-default">
					{t('teamSettings.memberList.table.id.label')}
				</TableHead>
				<PageTableSortableHeader
					label={t('teamSettings.memberList.table.name.label')}
					field="name"
					store={teamSettingsMemberStore}
					additionalClass="w-50"
				/>
				<TableHead>
					{t('teamSettings.memberList.table.permissions.label')}
				</TableHead>
				<PageTableSortableHeader
					label={t('teamSettings.memberList.table.joinedAt.label')}
					field="createdAt"
					store={teamSettingsMemberStore}
					additionalClass="w-[fit-content]"
				/>
				<TableHead class="w-[100px] cursor-default">
					{t('teamSettings.memberList.table.actions.label')}
				</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{#each data as entry, index}
				<TableRow>
					<TableCell>{index + 1}</TableCell>
					<TableCell>{entry.name}</TableCell>
					<TableCell>{entry.permissions}</TableCell>
					<TableCell>{new Date(entry.created_at).toLocaleDateString()}</TableCell>
					<TableCell class="flex gap-2">
						<Button
							variant="destructive"
							size="icon"
							onclick={() => {
								teamSettingsMemberStore.currentMemberTeamId = entry.team_id;
								teamSettingsMemberStore.currentMemberTeamName = entry.name;
								dialogStore.showTeamSettingsMemberDeleteDialog = true;
							}}
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
				{t('teamSettings.memberList.noData.label')}
			</p>
		</div>
	{/if}
</div>

<PageTeamSettingsMemberDeleteDialog />
