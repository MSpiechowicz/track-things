<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { calendarStore } from '$lib/stores/calendarStore.svelte';
	import IconArrowBigLeft from '../svg/IconArrowBigLeft.svelte';
	import IconArrowBigRight from '../svg/IconArrowBigRight.svelte';
</script>

<div class="flex flex-row gap-2">
	<Button size="icon" class="min-h-[42px]" onclick={calendarStore.decrementDate}>
		<IconArrowBigLeft fillColor="white" />
	</Button>
	<Button variant="outline" class="text-black" onclick={calendarStore.setTodayDate}
		>Today</Button
	>
	<Button size="icon" class="min-h-[42px]" onclick={calendarStore.incrementDate}>
		<IconArrowBigRight fillColor="white" />
	</Button>
</div>
