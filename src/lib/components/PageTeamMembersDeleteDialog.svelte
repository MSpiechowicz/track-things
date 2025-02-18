<script lang="ts">
	import { invalidate } from '$app/navigation';
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
	import { teamMembersStore } from '$lib/stores/teamMembersStore.svelte';
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { timer } from '$lib/utils/progressTimer.svelte';
	import { toast } from 'svelte-sonner';

	async function handleDelete(email: string | null, teamId: string | null) {
		if (!email || !teamId) {
			toast.error('Error', {
				description: 'We are unable to delete this team member due to invalid email or team ID.'
			});
			return;
		}

		const response = await fetch(`/api/v1/team-members/delete?email=${email}&teamId=${teamId}`, {
			method: 'DELETE'
		});

		const result = await response.json();

		if (result.success) {
			teamSettingsOwnerStore.currentTeamMembers = teamSettingsOwnerStore.currentTeamMembers.filter(
				(entry) => entry.email !== email
			);

			//teamSettingsOwnerStore.data = teamSettingsOwnerStore.data.map((team) => {
			//	if (team.id === teamId) {
			//		return {
			//			...team,
			//			members: team.members.filter((member) => member.email !== email)
			//		};
			//	}
			//	return team;
			//});

			teamMembersStore.data = teamMembersStore.data.filter((entry) => entry.email !== email);

      timer.reset();

      invalidate('app:dashboard');

			dialogStore.showTeamMembersDeleteDialog = false;

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
	open={dialogStore.showTeamMembersDeleteDialog}
	onOpenChange={() => (dialogStore.showTeamMembersDeleteDialog = false)}
>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Delete Team Member</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Are you sure that you want to delete member <span class="font-bold"
					>{teamMembersStore.currentMemberName}</span
				> from your team?
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => (dialogStore.showTeamMembersDeleteDialog = false)}
				>Cancel</Button
			>
			<Button
				variant="destructive"
				onclick={() =>
					handleDelete(teamMembersStore.currentMemberEmail, teamMembersStore.currentMemberTeamId)}
				>Delete</Button
			>
		</DialogFooter>
	</DialogContent>
</Dialog>
