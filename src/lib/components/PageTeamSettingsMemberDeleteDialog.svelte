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
	import { teamSettingsMemberStore } from '$lib/stores/teamSettingsMemberStore.svelte';
	import { toast } from 'svelte-sonner';

	async function handleDelete(id: string | null) {
		if (!id) {
			toast.error('Error', {
				description: 'We are unable to remove your from this team due to invalid ID.'
			});
			return;
		}

		const response = await fetch('/api/v1/team-settings/member/delete', {
			method: 'DELETE'
		});

		if (response.ok) {
			teamSettingsMemberStore.data = teamSettingsMemberStore.data.filter(
				(entry) => entry.id !== id
			);
      
			dialogStore.showTeamSettingsMemberDeleteDialog = false;

			toast.success('Success', {
				description: 'You have been removed from the selected team successfully.'
			});
		} else {
			toast.error('Error', {
				description: 'We are unable to remove you from the selected team. Please try again later.'
			});
		}
	}
</script>

<Dialog
	open={dialogStore.showTeamSettingsMemberDeleteDialog}
	onOpenChange={() => (dialogStore.showTeamSettingsMemberDeleteDialog = false)}
>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Delete Team Member</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Are you sure you want to remove yourself from the team: <span class="font-bold"
					>{teamSettingsMemberStore.currentTeamName}</span
				>?
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button
				variant="outline"
				onclick={() => (dialogStore.showTeamSettingsMemberDeleteDialog = false)}>Cancel</Button
			>
			<Button
				variant="destructive"
				onclick={() => handleDelete(teamSettingsMemberStore.currentTeamId)}>Delete</Button
			>
		</DialogFooter>
	</DialogContent>
</Dialog>
