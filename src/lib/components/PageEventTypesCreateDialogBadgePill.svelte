<script lang="ts">
  import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
  import { Trash2Icon } from 'lucide-svelte';

  let { label, teams = $bindable() } = $props();

  function removeTeam() {
    teams = teams.filter((team: { name: string }) => team.name !== label);
  }
</script>

<Badge class="bg-blue-600 text-white">
  {label}
  <Button variant="outline" size="icon" onclick={removeTeam}>
    <Trash2Icon class="h-4 w-4" />
  </Button>
</Badge>
