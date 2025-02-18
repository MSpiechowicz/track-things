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
	import { teamSettingsOwnerStore } from '$lib/stores/teamSettingsOwnerStore.svelte';
	import { teamSettingsTimer } from '$lib/utils/timers/defaults';
	import { toast } from "svelte-sonner";

  async function handleDelete(id: string | null) {
    if (!id) {
      toast.error("Error", {
        description: "We are unable to delete this team settings due to invalid ID."
      });
      return;
    }

    const response = await fetch(`/api/v1/team-settings/delete?id=${id}`, {
      method: 'POST',
    });

    if (response.ok) {
      teamSettingsOwnerStore.data = teamSettingsOwnerStore.data.filter(entry => entry.id !== id);
      teamSettingsOwnerStore.resetCurrentTeam();

      dialogStore.showTeamSettingsDeleteDialog = false;

      teamSettingsTimer.reset();

      invalidate('app:dashboard');

      toast.success("Success", {
        description: "Your team settings has been deleted successfully."
      });
    } else {
      toast.error("Error", {
        description: "We are unable to delete this team settings. Please try again later."
      });
    }
  }
</script>

<Dialog open={dialogStore.showTeamSettingsDeleteDialog} onOpenChange={() => {
  dialogStore.showTeamSettingsDeleteDialog = false;
  teamSettingsOwnerStore.resetCurrentTeam();
}}>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Delete Team Settings</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Are you sure you want to delete team <span class="font-bold">{teamSettingsOwnerStore.currentTeamName}</span> settings?
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => {
        dialogStore.showTeamSettingsDeleteDialog = false;
        teamSettingsOwnerStore.resetCurrentTeam();
      }}>Cancel</Button>
			<Button variant="destructive" onclick={() => handleDelete(teamSettingsOwnerStore.currentTeamId)}>Delete</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
