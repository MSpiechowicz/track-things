<script lang="ts">
	import IconTrash from '$lib/components/svg/IconTrash.svelte';
	import { Button } from '$lib/components/ui/button';
	import {
		FormControl,
		FormDescription,
		FormField,
		FormFieldErrors,
		FormLabel
	} from '$lib/components/ui/form';
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
	import { teamSettingsUpdateSchemaValidator } from '$lib/validators/teamSettingsUpdateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	import PageTableSortableHeader from '$lib/components/PageTableSortableHeader.svelte';
	import PageTeamMembersCreateDialog from '$lib/components/PageTeamMembersCreateDialog.svelte';
	import PageTeamMembersDeleteDialog from '$lib/components/PageTeamMembersDeleteDialog.svelte';
	import IconPlus from '$lib/components/svg/IconPlus.svelte';

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
					const existingIndex = teamSettingsOwnerStore.data.findIndex(
						// @ts-expect-error - data is present
						(item) => item.id === event.result.data?.id
					);

					if (existingIndex !== -1) {
						teamSettingsOwnerStore.data[existingIndex] = {
							id: event.result.data?.id,
							name: event.result.data?.name,
							created_at: event.result.data?.created_at,
							updated_at: event.result.data?.updated_at,
							members: teamMembersStore.data,
							tracking_ids: event.result.data?.tracking_ids
						};
					} else {
						teamSettingsOwnerStore.data.push({
							id: event.result.data?.id,
							name: event.result.data?.name,
							created_at: event.result.data?.created_at,
							updated_at: event.result.data?.updated_at,
							members: teamMembersStore.data,
							tracking_ids: event.result.data?.tracking_ids
						});
					}

          // Update the current team name
					teamSettingsOwnerStore.currentTeamName = event.result.data?.name;

          // Reset the form
					form.reset({
						id: event.result.data?.id ?? '',
            // @ts-expect-error - This is a valid type
						name: event.result.data?.name ?? ''
					});

					toast.success('Success', {
						description: 'Your team has been updated successfully.'
					});
				}

				if (eventType === 'failure') {
					toast.error('Error', {
						description: 'We were unable to update your team. Please try again.'
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
	});

  const data = $derived(
		teamMembersStore.dataFiltered && teamMembersStore.dataFiltered.length > 0
			? teamMembersStore.dataFiltered
			: teamMembersStore.data
	);
</script>

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
				<FormLabel class="text-md !text-white">Team Name</FormLabel>
				<FormDescription class="mb-4 text-sm text-neutral-400">
					This is your team's name that will be displayed as a identifier for your entire team.
				</FormDescription>
				<div class="flex flex-row items-center gap-2">
					<Input
						bind:value={$formData.name}
						class="text-md max-w-sm text-black focus-visible:{errors.length > 0
							? 'ring-red-500'
							: 'ring-blue-600'} focus-visible:ring-offset-0 {errors.length > 0
							? 'ring-2 ring-red-500'
							: 'ring-0 ring-blue-600'}"
						placeholder="Enter team name"
						autocomplete="off"
						{...attrs}
					/>
					<Button type="submit" variant="default" class="border-1 py-5 text-white">Save</Button>
				</div>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>
	</form>

	<div class="mt-8">
		<h3 class="text-md font-medium">Team Members</h3>
		<p class="mb-4 text-sm text-neutral-400">You can manage your team members here.</p>
    <div class="mb-4 flex max-w-sm items-center gap-2">
      <Input
        placeholder="Search"
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
            label="Name"
            store={teamMembersStore}
            additionalClass="w-50"
          />
					<PageTableSortableHeader
            field="email"
            label="Email"
            store={teamMembersStore}
            additionalClass="w-64"
          />
					<PageTableSortableHeader
            field="permissions"
            label="Permissions"
            store={teamMembersStore}
            additionalClass="w-40"
          />
					<PageTableSortableHeader
            field="created_at"
            label="Joined at"
            store={teamMembersStore}
            additionalClass="w-40"
          />
					<TableHead class="w-16">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each data as member, index}
					<TableRow>
						<TableCell>{index + 1}</TableCell>
						<TableCell>{member.name}</TableCell>
						<TableCell>{member.email}</TableCell>
						<TableCell>{member.permissions}</TableCell>
            <TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell>
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
					There are currently no team members assigned to your team.
				</p>
			</div>
		{/if}

		<div class="mt-4 flex items-center gap-4">
			<Button
				variant="default"
				class="border-1 py-5"
				onclick={() => {
					teamMembersStore.currentMemberTeamId = teamSettingsOwnerStore.currentTeamId ?? '';
					dialogStore.showTeamMembersCreateDialog = true;
				}}
			>
				<IconPlus additionalClass="!h-5 !w-5" />
				Add Member
			</Button>
		</div>
	</div>
</div>

<PageTeamMembersCreateDialog />
<PageTeamMembersDeleteDialog />
