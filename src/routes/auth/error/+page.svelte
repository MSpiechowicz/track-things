<script lang="ts">
	import { goto } from '$app/navigation';
	import IconMoodWrrr from '$lib/components/svg/IconMoodWrrr.svelte';
	import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-1 flex-col items-center justify-center gap-4 text-white">
	<IconMoodWrrr additionalClass="h-16 w-16" />
	<h1 class="text-3xl font-bold tracking-tight md:text-4xl">Authentication Error</h1>
	<p class="text-muted-foreground text-center text-lg max-w-[80ch]">
		There was a problem with your authentication for selected provider. Please try signing in again later.
	</p>
	<div class="mt-4">
		<Button onclick={() => goto('/')}>Return to Home Page</Button>
	</div>
</div>
