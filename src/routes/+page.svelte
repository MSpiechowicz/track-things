<script lang="ts">
	import { goto } from '$app/navigation';
	import IconHeroChart from '$lib/components/svg/IconHeroChart.svelte';
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();
  const { userProfile } = $derived(data);

  $effect(() => {
    if (userProfile) {
      goto('/dashboard');
    }
  });
</script>

<div class="flex h-full w-full flex-1 flex-col items-center justify-center gap-12 md:flex-row md:justify-between">
  <div class="flex max-w-2xl flex-col gap-6">
    <h1 class="flex flex-col text-4xl font-bold md:text-5xl lg:text-6xl">
      <span>Effortless Tracking</span>
      <span class="text-blue-600">Clear Insights</span>
    </h1>
    <p class="max-w-[60ch] text-lg text-gray-300 md:text-xl">
      Simplify your tracking journey with a user-friendly platform that transforms your data
      into meaningful charts. No technical skills or spreadsheets required.
    </p>
    <div class="flex">
      <Button
        onclick={async () => userProfile ? goto('/dashboard') : goto('/auth/login')}
        variant="default"
      >
        Start Tracking Now
      </Button>
    </div>
  </div>
  <div class="hidden items-center justify-center lg:flex">
    <IconHeroChart additionalClass="h-auto w-[300px] md:w-[400px] xl:w-[500px]" />
  </div>
</div>
