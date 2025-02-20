<script lang="ts">
	import { goto } from '$app/navigation';
	import IconHeroChart from '$lib/components/svg/IconHeroChart.svelte';
	import { Button } from '$lib/components/ui/button';
	import { t } from '$lib/translations';

	const { data } = $props();
  const { userProfile } = $derived(data);
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-12 md:flex-row md:justify-between">
  <div class="flex max-w-2xl flex-col gap-6">
    <h1 class="flex flex-col text-4xl font-bold md:text-5xl lg:text-6xl">
      <span>{t('page.home.title_1')}</span>
      <span class="text-blue-600">{t('page.home.title_2')}</span>
    </h1>
    <p class="max-w-[60ch] text-lg text-gray-300 md:text-xl">
      {t('page.home.description')}
    </p>
    <div class="flex">
      <Button
        onclick={async () => userProfile ? goto('/dashboard') : goto('/auth/login')}
        variant="default"
        aria-label={userProfile ? "Go to dashboard" : "Login to start tracking"}
      >
        {t('page.home.button.label')}
      </Button>
    </div>
  </div>
  <div class="hidden items-center justify-center lg:flex">
    <IconHeroChart additionalClass="h-auto w-[300px] md:w-[400px] xl:w-[500px]" />
  </div>
</div>
