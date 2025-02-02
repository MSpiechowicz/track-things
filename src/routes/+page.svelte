<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	const { data } = $props();

	//$inspect(data.userProfile);

  const { userProfile } = data;

  $effect(() => {
    if (userProfile) {
      window.location.href = '/dashboard';
    }
  });
</script>

{#if data.userProfile}
	<p>Welcome, {data.userProfile.name}!</p>
{:else}
	<Button href="/auth/login">Login to the site!</Button>
{/if}
