<script lang="ts">
  import { Progress } from "$lib/components/ui/progress";
  import { timer } from "$lib/stores/timerStore.svelte";

  const { duration = 1500 } = $props();

  $effect(() => {
    let startTime = performance.now();

    let frame = requestAnimationFrame(function update(time) {
			frame = requestAnimationFrame(update);

			timer.setProgress(Math.min(((time - startTime) / duration) * 60, 100));

			startTime = time;

      if (timer.progress >= 100) {
        cancelAnimationFrame(frame);
      }
    });

		return () => {
			cancelAnimationFrame(frame);
		};
  });
</script>

<div class="flex h-full w-full items-center justify-center">
  <div class="w-[60%] max-w-md">
    <Progress value={timer.progress} />
    <div class="mt-1 flex items-center justify-between">
      <p class="text-sm text-gray-400">Loading...</p>
      <p class="text-sm text-gray-400">{timer.progress.toFixed(0)}%</p>
    </div>
  </div>
</div>
