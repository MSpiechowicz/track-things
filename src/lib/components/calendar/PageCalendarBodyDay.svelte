<script lang="ts">
	// Import necessary components

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

	// Initialize hours array
	//$effect(() => {
		// Generate hours from 0 to 23
		hours.push(...Array.from({ length: 24 }, (_, i) => i));
	//});
</script>

<div class="calendar-day-view mt-8">
	<div class="calendar-day-grid">
		<!-- Hours column -->
		<div class="hours-column">
			{#each hours as hour}
				<div class="hour-cell" style="height: {hourHeight}px">
					<span class="hour-label">{formatHour(hour)}</span>
				</div>
			{/each}
		</div>

		<!-- Events grid -->
		<div class="events-grid">
			<!-- Hour rows - using index only without declaring a variable -->
			{#each Array(hours.length) as _, i}
				<div class="hour-row" style="height: {hourHeight}px" data-hour={i}>
					<!-- Half-hour marker -->
					<div class="half-hour-marker"></div>
				</div>
			{/each}

			<!-- Events -->
			{#each events as event (event.id)}
				<div
					class="event-item"
					style="top: {getEventStyle(event).top};
                 height: {getEventStyle(event).height};
                 background-color: {getEventStyle(event).backgroundColor};"
				>
					<div class="event-content">
						<div class="event-title">{event.title}</div>
						<div class="event-time">
							{event.start.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })} -
							{event.end.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>

<style>
	.calendar-day-view {
		display: flex;
		flex-direction: column;
		height: 100%;
		width: 100%;
		background-color: white;
		border-radius: 0.375rem;
	}

	.calendar-day-header {
		padding: 0.75rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.calendar-day-grid {
		display: flex;
		flex: 1;
		overflow-y: auto;
		position: relative;
	}

	.hours-column {
		width: 4rem;
		border-right: 1px solid #e5e7eb;
		flex-shrink: 0;
	}

	.hour-cell {
		position: relative;
		border-bottom: 1px solid #e5e7eb;
		padding: 0.25rem;
	}

	.hour-label {
		position: absolute;
		top: 0rem;
		right: 0.5rem;
		font-size: 0.75rem;
		color: #6b7280;
	}

	.events-grid {
		flex: 1;
		position: relative;
	}

	.hour-row {
		position: relative;
		border-bottom: 1px solid #e5e7eb;
	}

	.half-hour-marker {
		position: absolute;
		top: 50%;
		left: 0;
		right: 0;
		border-bottom: 1px dashed #e5e7eb;
	}

	.event-item {
		position: absolute;
		left: 0.25rem;
		right: 0.25rem;
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
		overflow: hidden;
		color: white;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.event-item:hover {
		opacity: 0.9;
	}

	.event-content {
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.event-title {
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.event-time {
		font-size: 0.75rem;
		opacity: 0.9;
	}
</style>
