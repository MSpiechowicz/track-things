<script lang="ts">
  import { Progress } from "$lib/components/ui/progress";

  const { progress } = $props();
</script>

<div class="flex h-full w-full items-center justify-center">
  <div class="w-[60%] max-w-md">
    <Progress value={progress} />
    <div class="mt-1 flex items-center justify-between">
      <p class="text-sm text-gray-400">Loading...</p>
      <p class="text-sm text-gray-400">{progress}%</p>
    </div>
  </div>
</div>
