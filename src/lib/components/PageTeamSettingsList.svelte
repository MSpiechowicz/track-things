<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import {
  	Table,
  	TableBody,
  	TableCell,
  	TableHead,
  	TableHeader,
  	TableRow,
  } from "$lib/components/ui/table";
  import { toast } from "svelte-sonner";
//import { MoreHorizontal, Pencil, Trash } from "lucide-svelte";

  import { teamSettingsStore } from "$lib/stores/teamSettings.svelte";

  import IconPencil from "$lib/components/svg/IconPencil.svelte";
  import IconTrash from "$lib/components/svg/IconTrash.svelte";

  function handleEdit(id: number) {
    // Implement edit functionality
    console.log('Edit team setting:', id);
  }

  async function handleDelete(id: number) {
    const response = await fetch(`/api/v1/team-settings/delete?id=${id}`, {
      method: 'POST',
    });

    if (response.ok) {
      teamSettingsStore.data = teamSettingsStore.data.filter(entry => entry.id !== id);

      toast.success("Success", {
        description: "Team settings deleted successfully"
      });
    } else {
      toast.error("Error", {
        description: "Failed to delete team settings"
      });
    }
  }
</script>

<div class="py-6">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead class="w-[100px]">ID</TableHead>
        <TableHead>Name</TableHead>
        <TableHead>Last Updated</TableHead>
        <TableHead class="w-[100px]">Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {#each teamSettingsStore.data as entry, index}
        <TableRow>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{entry.name}</TableCell>
          <TableCell>{new Date(entry.updated_at).toLocaleDateString()}</TableCell>
          <TableCell class="flex gap-2">
            <Button variant="secondary" size="icon">
              <IconPencil additionalClass="h-4 w-4" strokeColor="black" />
            </Button>
            <Button variant="destructive" size="icon" onclick={() => handleDelete(entry.id)}>
              <IconTrash additionalClass="h-4 w-4 text-white" />
            </Button>
          </TableCell>
        </TableRow>
      {/each}
    </TableBody>
  </Table>
</div>
