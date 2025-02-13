<script lang="ts">
  import { Progress } from "$lib/components/ui/progress";
  import { timer } from "$lib/utils/timer.svelte";

  const { duration = 1500 } = $props();

  $effect(() => {
    const startTime = performance.now();

    let animationFrame: number;

    function animate() {
      const currentTime = performance.now();
      const elapsedTime = currentTime - startTime;

      // Calculate percentage of time used (elapsed time vs max duration)
      const progressPercentage = (elapsedTime / duration) * 100;

      // Ensure we don't exceed 100%
      timer.setProgress(Math.min(progressPercentage, 100));

      if (elapsedTime < duration) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        timer.setProgress(100); // Ensure we end at exactly 100%
      }
    }

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  });
</script>

<div class="flex flex-1 justify-center">
  <div class="min-w-[200px] max-w-md">
    <Progress value={Math.round(timer.progress)} />
    <div class="mt-1 flex items-center justify-between">
      <p class="text-sm text-gray-400">Loading...</p>
      <p class="text-sm text-gray-400">{timer.progress.toFixed(0)}%</p>
    </div>
  </div>
</div>
