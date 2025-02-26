<script lang="ts">
	import { calendarStore } from '$lib/stores/calendarStore.svelte';
</script>

<div class="flex flex-1 items-center md:justify-center text-black">
	<span class="text-lg"
		>{calendarStore.date.toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		})}</span
	>
</div>
