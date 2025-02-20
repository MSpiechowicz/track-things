<script lang="ts">
	import PageFormInput from '$lib/components/PageFormInput.svelte';
	import PageFormLabel from '$lib/components/PageFormLabel.svelte';
	import PageTableSortableHeader from '$lib/components/PageTableSortableHeader.svelte';
	import PageTeamMembersCreateDialog from '$lib/components/PageTeamMembersCreateDialog.svelte';
	import PageTeamMembersDeleteDialog from '$lib/components/PageTeamMembersDeleteDialog.svelte';
	import IconPlus from '$lib/components/svg/IconPlus.svelte';
	import IconTrash from '$lib/components/svg/IconTrash.svelte';
	import { Button } from '$lib/components/ui/button';
	import { FormControl, FormField, FormFieldErrors } from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import {
		Table,
		TableBody,
		TableCell,
		TableHead,
		TableHeader,
		TableRow
	} from '$lib/components/ui/table';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamMembersStore } from '$lib/stores/teamMembersStore.svelte';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { t } from '$lib/translations';
	import { teamSettingsUpdateTimer } from '$lib/utils/timers/defaults';
	import { teamSettingsUpdateSchemaValidator } from '$lib/validators/teamSettingsUpdateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';
	import PageSpinner from './PageSpinner.svelte';

	const form = superForm(
		{
			id: teamSettingsOwnerStore.currentTeamId ?? '',
			name: teamSettingsOwnerStore.currentTeamName ?? ''
		},
		{
			validators: teamSettingsUpdateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result.type;

				if (eventType === 'success') {
					const index = teamSettingsOwnerStore.data.findIndex(
						// @ts-expect-error - data is present
						(item) => item.id === event.result.data?.id
					);

					teamSettingsOwnerStore.data[index] = {
						id: event.result.data?.id,
						name: event.result.data?.name,
						created_at: event.result.data?.created_at,
						updated_at: event.result.data?.updated_at,
						members: event.result.data?.members,
						tracking_ids: event.result.data?.tracking_ids
					};

					// Update the current team name
					teamSettingsOwnerStore.currentTeamName = event.result.data?.name;

					// Reset the form
					form.reset({
						id: event.result.data?.id ?? '',
						// @ts-expect-error - This is a valid type
						name: event.result.data?.name ?? ''
					});

					toast.success(t('teamSettings.update.toast.success.title'), {
						description: t('teamSettings.update.toast.success.description')
					});
				} else {
					toast.error(t('teamSettings.update.toast.error.title'), {
						description: t('teamSettings.update.toast.error.description')
					});
				}
			}
		}
	);

	const { form: formData, enhance } = form;

	async function getAllTeamMembers() {
		const response = await fetch(
			`/api/v1/team-members/get/all?teamId=${teamSettingsOwnerStore.currentTeamId}`
		);

		const result = await response.json();

		teamMembersStore.data = result.data;
	}

	$effect(() => {
		getAllTeamMembers();

		dashboardStore.isChildView = true;
		dashboardStore.goBack = () => {
			teamSettingsOwnerStore.showUpdateView = false;
			dashboardStore.isChildView = false;
		};

		$formData.name = teamSettingsOwnerStore.currentTeamName ?? '';
		$formData.id = teamSettingsOwnerStore.currentTeamId ?? '';

		teamSettingsUpdateTimer.start();
	});

	const data = $derived(
		teamMembersStore.dataFiltered && teamMembersStore.dataFiltered.length > 0
			? teamMembersStore.dataFiltered
			: teamMembersStore.data
	);
</script>

{#if teamSettingsUpdateTimer.isRunning}
	<div class="mt-8">
		<PageSpinner additionalClass="w-10 h-10" />
	</div>
{:else}
	<div class="flex flex-1 flex-col">
		<form
			method="POST"
			action="/api/v1/team-settings/update"
			class="mt-6 w-full space-y-8"
			use:enhance
			id="update-team-form"
			data-sveltekit-reload
		>
			<input type="hidden" name="id" value={teamSettingsOwnerStore.currentTeamId ?? ''} />
			<FormField {form} name="name" let:errors>
				<FormControl let:attrs>
					<PageFormLabel
						label={t('teamSettings.update.form.name.label')}
						description={t('teamSettings.update.form.name.description')}
						isTextWhite={true}
					/>
					<div class="flex flex-row items-center gap-2">
						<PageFormInput
							bind:value={$formData.name}
							{errors}
							{attrs}
							placeholder={t('teamSettings.update.form.name.input.placeholder')}
						/>
						<Button type="submit" variant="default" class="py-5 text-white">
							{t('teamSettings.update.form.button.save.label')}
						</Button>
					</div>
				</FormControl>
				<FormFieldErrors class="text-red-500" />
			</FormField>
		</form>
		<div class="mt-8">
			<h3 class="text-md font-medium">
				{t('teamSettings.update.table.members.title')}
			</h3>
			<p class="mb-4 text-sm text-neutral-400">
				{t('teamSettings.update.table.members.description')}
			</p>
			<div class="mb-4 flex max-w-sm items-center gap-2">
				<Input
					placeholder={t('teamSettings.update.table.members.input.placeholder')}
					oninput={(e) => teamMembersStore.filterData((e.target as HTMLInputElement)?.value)}
					class="text-black"
				/>
			</div>
			<Table>
				<TableHeader>
					<TableRow class="hover:bg-transparent">
						<TableHead class="w-16">ID</TableHead>
						<PageTableSortableHeader
							field="name"
							label={t('teamSettings.update.table.members.table.name.label')}
							store={teamMembersStore}
							additionalClass="w-50"
						/>
						<PageTableSortableHeader
							field="email"
							label={t('teamSettings.update.table.members.table.email.label')}
							store={teamMembersStore}
							additionalClass="w-64 hidden md:table-cell"
						/>
						<PageTableSortableHeader
							field="permissions"
							label={t('teamSettings.update.table.members.table.permissions.label')}
							store={teamMembersStore}
							additionalClass="w-40 hidden md:table-cell"
						/>
						<PageTableSortableHeader
							field="created_at"
							label={t('teamSettings.update.table.members.table.createdAt.label')}
							store={teamMembersStore}
							additionalClass="w-40 hidden md:table-cell"
						/>
						<TableHead class="w-16">
							{t('teamSettings.update.table.members.table.actions.label')}
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{#each data as member, index}
						<TableRow>
							<TableCell>{index + 1}</TableCell>
							<TableCell>{member.name}</TableCell>
							<TableCell class="hidden md:table-cell">{member.email}</TableCell>
							<TableCell class="hidden md:table-cell">{member.permissions}</TableCell>
							<TableCell class="hidden md:table-cell">{new Date(member.created_at).toLocaleDateString()}</TableCell>
							<TableCell>
								<Button
									variant="destructive"
									size="icon"
									onclick={() => {
										teamMembersStore.currentMemberId = member.id;
										teamMembersStore.currentMemberName = member.name;
										teamMembersStore.currentMemberEmail = member.email;
										teamMembersStore.currentMemberTeamId = teamSettingsOwnerStore.currentTeamId;
										dialogStore.showTeamMembersDeleteDialog = true;
									}}
								>
									<IconTrash additionalClass="h-4 w-4" />
								</Button>
							</TableCell>
						</TableRow>
					{/each}
				</TableBody>
			</Table>
			{#if !teamMembersStore.data || teamMembersStore.data.length === 0}
				<div class="flex h-[68.5px] w-full items-center justify-center">
					<p class="text-sm text-neutral-400">
						{t('teamSettings.update.table.members.noData.label')}
					</p>
				</div>
			{/if}
			<div class="mt-4 flex items-center gap-4">
				<Button
					variant="default"
					class="py-5"
					onclick={() => {
						teamMembersStore.currentMemberTeamId = teamSettingsOwnerStore.currentTeamId ?? '';
						dialogStore.showTeamMembersCreateDialog = true;
					}}
				>
					<IconPlus additionalClass="!h-5 !w-5" />
					{t('teamSettings.update.table.members.button.add.label')}
				</Button>
			</div>
		</div>
	</div>
{/if}

<PageTeamMembersCreateDialog />
<PageTeamMembersDeleteDialog />
