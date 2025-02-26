<script lang="ts">
	import { CALENDAR_VIEWS } from '$lib/constants';
	import { calendarStore } from '$lib/stores/calendarStore.svelte';

	function getDateString() {
		if (calendarStore.viewType === CALENDAR_VIEWS.DAY) {
			return calendarStore.date.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			});
		} else if (calendarStore.viewType === CALENDAR_VIEWS.WEEK) {
			return `${calendarStore.week.start.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})} - ${calendarStore.week.end.toLocaleDateString('en-US', {
				month: 'long',
				day: 'numeric',
				year: 'numeric'
			})}`;
		} else if (calendarStore.viewType === CALENDAR_VIEWS.MONTH) {
			return calendarStore.date.toLocaleDateString('en-US', {
				month: 'long',
				year: 'numeric'
			});
		} else if (calendarStore.viewType === CALENDAR_VIEWS.YEAR) {
			return calendarStore.date.toLocaleDateString('en-US', { year: 'numeric' });
		}
	}
</script>

<div class="flex flex-1 items-center text-black md:justify-center">
	<span class="text-lg">{getDateString()}</span>
</div>
