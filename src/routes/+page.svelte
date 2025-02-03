<script lang="ts">
	import { goto } from '$app/navigation';
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();

	//$inspect(data.userProfile);

  const { userProfile } = data;

  $effect(() => {
    if (userProfile) {
      goto('/dashboard');
    }
  });
</script>

<div class="flex h-full w-full flex-1 flex-col items-center justify-center gap-8 md:flex-row md:justify-between">
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
  <div class="hidden items-center justify-center md:flex">
    <img
      src="https://550azscrsk.ufs.sh/f/5uPOqSj68BeJxVQZi4INAHIjWPdQ6Mu92KRJXotZOfizyaT7"
      alt="Hero Chart"
      width={612}
      height={368}
      class="h-auto w-[300px] md:w-[450px] xl:w-[612px]"
    />
  </div>
</div>
