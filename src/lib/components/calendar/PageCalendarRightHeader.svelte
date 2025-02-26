<script>
	import { Button } from '$lib/components/ui/button';
	import { calendarStore } from '$lib/stores/calendarStore.svelte';
</script>

<div class="flex gap-2">
	<Button variant="outline" class="text-black" onclick={calendarStore.setDayDate}>Day</Button>
	<Button variant="outline" class="text-black" onclick={calendarStore.setWeekDate}>Week</Button>
	<Button variant="outline" class="text-black" onclick={calendarStore.setMonthDate}>Month</Button>
	<Button variant="outline" class="text-black" onclick={calendarStore.setYearDate}>Year</Button>
</div>
