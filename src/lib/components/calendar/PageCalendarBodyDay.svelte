<script lang="ts">
	// Import necessary components
	import { createEventDispatcher } from 'svelte';

	// Define props using Svelte 5 runes
	const { date = new Date(), events = [] } = $props<{
		date?: Date;
		events?: Array<{
			id: string;
			title: string;
			start: Date;
			end: Date;
			color?: string;
		}>;
	}>();

	// Setup event dispatcher
	const dispatch = createEventDispatcher<{
		addEvent: { start: Date; end: Date };
		eventClick: { id: string };
	}>();

	// State for the component
	const hours = $state<number[]>([]);
	const hourHeight = $state(60); // Height in pixels for each hour row

	// Format time (e.g., "9 AM", "2 PM")
	function formatHour(hour: number): string {
		if (hour === 0 || hour === 24) return '12 AM';
		if (hour === 12) return '12 PM';
		return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
	}

	// Calculate position and height for an event
	function getEventStyle(event: (typeof events)[number]) {
		const startHour = event.start.getHours() + event.start.getMinutes() / 60;
		const endHour = event.end.getHours() + event.end.getMinutes() / 60;

		const top = startHour * hourHeight;
		const height = (endHour - startHour) * hourHeight;

		return {
			top: `${top}px`,
			height: `${height}px`,
			backgroundColor: event.color || '#3b82f6' // Default blue color
		};
	}

	// Handle click on the calendar grid to add a new event
	function handleGridClick(e: MouseEvent | KeyboardEvent, hourElement: HTMLElement) {
		// Only proceed if it's a click or Enter/Space key
		if (
			e instanceof KeyboardEvent &&
			e.key !== 'Enter' &&
			e.key !== ' '
		) {
			return;
		}

		// Get the hour from the data attribute
		const hour = parseInt(hourElement.dataset.hour || '0', 10);

		// Calculate minutes based on click position within the hour cell
		let minutes = 0;
		if (e instanceof MouseEvent) {
			const rect = hourElement.getBoundingClientRect();
			const clickPositionY = e.clientY - rect.top;
			const minutePercentage = clickPositionY / rect.height;
			minutes = Math.floor(minutePercentage * 60);
		}

		// Create start and end times (default duration: 1 hour)
		const startTime = new Date(date);
		startTime.setHours(hour);
		startTime.setMinutes(minutes);
		startTime.setSeconds(0);
		startTime.setMilliseconds(0);

		const endTime = new Date(startTime);
		endTime.setHours(endTime.getHours() + 1);

		// Dispatch event to parent component
		dispatch('addEvent', { start: startTime, end: endTime });
	}

	// Handle click on an existing event
	function handleEventClick(event: (typeof events)[number]) {
		dispatch('eventClick', { id: event.id });
	}

	hours.push(...Array.from({ length: 24 }, (_, i) => i));
</script>

<div class="mt-4 flex h-full w-full flex-col rounded-md bg-white">
	<!-- Calendar day header with date -->
	<div class="border-b border-gray-200 p-3">
		{date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
	</div>
	<div class=" relative flex flex-1 overflow-y-auto">
		<!-- Hours column -->
		<div class="w-16 flex-shrink-0 border-r border-gray-200">
			{#each hours as hour}
				<div class="relative border-b border-gray-200 p-1" style="height: {hourHeight}px">
					<span class="absolute top-0 right-2 text-xs text-gray-500">{formatHour(hour)}</span>
				</div>
			{/each}
		</div>

		<!-- Events grid -->
		<div class="relative flex-1">
			<!-- Hour rows -->
			{#each hours as hour}
				<button
					type="button"
					class="relative w-full border-b border-gray-200 text-left"
					style="height: {hourHeight}px"
					data-hour={hour}
					aria-label="Add event at {formatHour(hour)}"
					onclick={(e) => handleGridClick(e, e.currentTarget)}
					onkeydown={(e) => handleGridClick(e, e.currentTarget)}
				>
					<!-- Half-hour marker -->
					<div class="absolute top-1/2 right-0 left-0 border-b border-dashed border-gray-200"></div>
				</button>
			{/each}

			<!-- Events -->
			{#each events as event (event.id)}
				<button
					type="button"
					class="absolute right-1 left-1 overflow-hidden rounded p-1 text-white transition-opacity hover:opacity-90 text-left"
					style="top: {getEventStyle(event).top};
                 height: {getEventStyle(event).height};
                 background-color: {getEventStyle(event).backgroundColor};"
					onclick={() => handleEventClick(event)}
					onkeydown={(e) => e.key === 'Enter' && handleEventClick(event)}
					aria-label="Edit event: {event.title}"
				>
					<div class="flex h-full flex-col p-1">
						<div class="overflow-hidden font-medium text-ellipsis whitespace-nowrap">
							{event.title}
						</div>
						<div class="text-xs opacity-90">
							{event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} -
							{event.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
						</div>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>
