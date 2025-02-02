<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let { data } = $props();

	$inspect(data.userProfile);
</script>

{#if data.userProfile}
	<p>Welcome, {data.userProfile.name}!</p>
{:else}
	<Button href="/auth/login">Login to the site!</Button>
{/if}
