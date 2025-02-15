<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { teamSettingsStore } from '$lib/stores/teamSettingsStore.svelte';
	import { toast } from 'svelte-sonner';

	async function handleDelete(id: number | null) {
		if (!id) {
			toast.error('Error', {
				description: 'We are unable to delete this team member due to invalid ID.'
			});
			return;
		}

		const response = await fetch(`/api/v1/team-members/delete?id=${id}`, {
			method: 'POST'
		});

		if (response.ok) {
			teamSettingsStore.members = teamSettingsStore.members.filter((entry) => entry.id !== id);
			teamSettingsStore.deleteTeamMemberId = null;
			teamSettingsStore.deleteTeamMemberName = null;
			teamSettingsStore.deleteTeamMemberEmail = null;
			dialogStore.showTeamMembersDelete = false;

			toast.success('Success', {
				description: 'Your team member has been deleted successfully.'
			});
		} else {
			toast.error('Error', {
				description: 'We are unable to delete this team member. Please try again later.'
			});
		}
	}
</script>

<Dialog
	open={dialogStore.showTeamMembersDelete}
	onOpenChange={() => (dialogStore.showTeamMembersDelete = false)}
>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Delete Team Member</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Are you sure you want to delete member <span class="font-bold"
					>{teamSettingsStore.deleteTeamMemberName}</span
				> from your team?
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => (dialogStore.showTeamMembersDelete = false)}
				>Cancel</Button
			>
			<Button
				variant="destructive"
				onclick={() => handleDelete(teamSettingsStore.deleteTeamMemberId)}>Delete</Button
			>
		</DialogFooter>
	</DialogContent>
</Dialog>
