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
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamMembersStore } from '$lib/stores/teamMembersStore.svelte';
	import { teamSettingsStore } from '$lib/stores/teamSettingsStore.svelte';
	import { teamSettingsUpdateSchemaValidator } from '$lib/validators/teamSettingsUpdateSchemaValidator';
	import { toast } from 'svelte-sonner';
	import { superForm } from 'sveltekit-superforms';

	import PageTeamMembersCreateDialog from '$lib/components/PageTeamMembersCreateDialog.svelte';
	import PageTeamMembersDeleteDialog from '$lib/components/PageTeamMembersDeleteDialog.svelte';
	import IconArrowBack from '$lib/components/svg/IconArrowBack.svelte';

	const form = superForm(
		{
			id: teamSettingsStore.currentTeamId ?? '',
			name: teamSettingsStore.currentTeamName ?? ''
		},
		{
			validators: teamSettingsUpdateSchemaValidator,
			onResult: async (event) => {
				const eventType = event.result.type;

				if (eventType === 'success') {
					const existingIndex = teamSettingsStore.data.findIndex(
						// @ts-expect-error - data is present
						(item) => item.id === event.result.data?.id
					);

					if (existingIndex !== -1) {
						teamSettingsStore.data[existingIndex] = {
							id: event.result.data?.id,
							name: event.result.data?.name,
							updated_at: event.result.data?.updated_at,
							members: teamMembersStore.data
						};
					} else {
						teamSettingsStore.data.push({
							id: event.result.data?.id,
							name: event.result.data?.name,
							updated_at: event.result.data?.updated_at,
							members: teamMembersStore.data
						});
					}
					console.log(teamSettingsStore.data);

					teamSettingsStore.showUpdateView = false;

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
			`/api/v1/team-members/get/all?teamId=${teamSettingsStore.currentTeamId}`
		);
		const result = await response.json();

		teamMembersStore.data = result.data;
	}

	$effect(() => {
		getAllTeamMembers();

		$formData.name = teamSettingsStore.currentTeamName ?? '';
		$formData.id = teamSettingsStore.currentTeamId ?? '';
	});
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
		<input type="hidden" name="id" value={teamSettingsStore.currentTeamId ?? ''} />
		<FormField {form} name="name" let:errors>
			<FormControl let:attrs>
				<FormLabel class="text-md !text-white">Team Name</FormLabel>
				<FormDescription class="mb-4 text-sm text-neutral-400">
					This is your team's name that will be displayed to the public.
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
		<p class="mb-4 text-sm text-neutral-400">Add or remove team members from your team.</p>
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead class="w-16">ID</TableHead>
					<TableHead>Name</TableHead>
					<TableHead>Email</TableHead>
					<TableHead>Joined Date</TableHead>
					<TableHead>Permissions</TableHead>
					<TableHead class="w-16">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{#each teamMembersStore.data as member, index}
					<TableRow>
						<TableCell>{index + 1}</TableCell>
						<TableCell>{member.name}</TableCell>
						<TableCell>{member.email}</TableCell>
						<TableCell>{new Date(member.created_at).toLocaleDateString()}</TableCell>
						<TableCell>{member.permissions}</TableCell>
						<TableCell>
							<Button
								variant="destructive"
								size="icon"
								onclick={() => {
									teamMembersStore.currentMemberId = member.id;
									teamMembersStore.currentMemberName = member.name;
									teamMembersStore.currentMemberEmail = member.email;
									teamMembersStore.currentMemberTeamId = teamSettingsStore.currentTeamId;
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
			<p class="mt-4 text-center text-sm text-neutral-400">
				No team members are currently assigned to your team. Click
				<Button
					variant="link"
					class="p-0 text-white"
					onclick={() => {
						teamMembersStore.currentMemberTeamId = teamSettingsStore.currentTeamId ?? '';
						dialogStore.showTeamMembersCreateDialog = true;
					}}
				>
					here
				</Button>
				to add a new member.
			</p>
		{/if}
	</div>

	<Button
		variant="secondary"
		class="mt-6 max-w-fit text-black"
		onclick={() => {
			teamSettingsStore.showUpdateView = false;
		}}
	>
		<IconArrowBack additionalClass="!h-5 !w-5" strokeColor="black" />
		Go Back
	</Button>
</div>

<PageTeamMembersCreateDialog />
<PageTeamMembersDeleteDialog />
