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
	import { teamSettingsStore } from '$lib/stores/teamSettings.svelte';
	import { toast } from "svelte-sonner";

  async function handleDelete(id: number | null) {
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
      teamSettingsStore.data = teamSettingsStore.data.filter(entry => entry.id !== id);
      teamSettingsStore.deleteTeamSettingId = null;
      teamSettingsStore.deleteTeamSettingName = null;
      dialogStore.showTeamSettingsDelete = false;

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

<Dialog open={dialogStore.showTeamSettingsDelete} onOpenChange={() => (dialogStore.showTeamSettingsDelete = false)}>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl">Delete Team Settings</DialogTitle>
			<DialogDescription class="text-base text-neutral-600">
				Are you sure you want to delete team <span class="font-bold">{teamSettingsStore.deleteTeamSettingName}</span> settings?
			</DialogDescription>
		</DialogHeader>
		<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
			<Button variant="outline" onclick={() => (dialogStore.showTeamSettingsDelete = false)}>Cancel</Button>
			<Button variant="destructive" onclick={() => handleDelete(teamSettingsStore.deleteTeamSettingId)}>Delete</Button>
		</DialogFooter>
	</DialogContent>
</Dialog>
