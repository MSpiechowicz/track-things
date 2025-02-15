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

	const form = superForm(
		{
			id: teamSettingsStore.updateTeamSettingId ?? '',
			name: teamSettingsStore.updateTeamSettingName ?? '',
			emails: teamSettingsStore.updateTeamSettingEmails ?? []
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
							updated_at: event.result.data?.updated_at
						};
					} else {
						teamSettingsStore.data.push({
							id: event.result.data?.id,
							name: event.result.data?.name,
							updated_at: event.result.data?.updated_at
						});
					}

					teamSettingsStore.updateView = false;

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
			`/api/v1/team-members/get/all?teamId=${teamSettingsStore.updateTeamSettingId}`
		);
		const result = await response.json();

		teamMembersStore.data = result.data;
    console.log('team members store', teamMembersStore.data);
	}

	$effect(() => {
		getAllTeamMembers();

		$formData.name = teamSettingsStore.updateTeamSettingName ?? '';
		$formData.id = teamSettingsStore.updateTeamSettingId ?? '';
	});
</script>

<div class="max-w-[80ch]">
	<!--<h2 class="mt-6 text-xl font-medium">Edit Team</h2>
	<p class="text-sm text-neutral-400">
		Please fill out the required fields below in order to update your team.
	</p>-->
	<form
		method="POST"
		action="/api/v1/team-settings/update"
		class="mt-6 space-y-8"
		use:enhance
		id="update-team-form"
		data-sveltekit-reload
	>
		<input type="hidden" name="id" value={teamSettingsStore.updateTeamSettingId ?? ''} />
		<FormField {form} name="name" let:errors>
			<FormControl let:attrs>
				<FormLabel class="text-md !text-white">Team Name</FormLabel>
				<FormDescription class="mb-4 text-sm text-neutral-400">
					This is your team's name that will be displayed to the public.
				</FormDescription>
				<Input
					bind:value={$formData.name}
					class="text-md mt-1 max-w-sm text-black focus-visible:{errors.length > 0
						? 'ring-red-500'
						: 'ring-blue-600'} focus-visible:ring-offset-0 {errors.length > 0
						? 'ring-2 ring-red-500'
						: 'ring-2 ring-blue-600'}"
					placeholder="Enter team name"
					autocomplete="off"
					{...attrs}
				/>
			</FormControl>
			<FormFieldErrors class="text-red-500" />
		</FormField>

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
							<TableCell>
								<Button variant="destructive" size="icon" on:click={() => console.log('remove')}>
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
							console.log('form id', $formData.id);
							console.log('team id', teamSettingsStore.updateTeamSettingId);

							teamMembersStore.currentMemberTeamId = teamSettingsStore.updateTeamSettingId ?? '';
							console.log('team members store', teamMembersStore.currentMemberTeamId);
							dialogStore.showTeamMembersCreate = true;
						}}
					>
						here
					</Button>
					to add a new member.
				</p>
			{/if}
		</div>

		<div class="flex flex-row items-center gap-4">
			<Button
				variant="outline"
				onclick={() => {
					teamSettingsStore.updateView = false;
				}}
				class="text-black"
			>
				Cancel
			</Button>
			<Button type="submit">Update Team</Button>
		</div>
	</form>
</div>

<PageTeamMembersCreateDialog />
