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

	hours.push(...Array.from({ length: 24 }, (_, i) => i));
</script>

<div class="mt-4 flex h-full w-full flex-col rounded-md bg-white">
	<!-- Calendar day header with date -->
	<div class="border-b border-gray-200 p-3"></div>
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
				<div
					class="relative border-b border-gray-200"
					style="height: {hourHeight}px"
					data-hour={hour}
				>
					<!-- Half-hour marker -->
					<div class="absolute top-1/2 right-0 left-0 border-b border-dashed border-gray-200"></div>
				</div>
			{/each}

			<!-- Events -->
			{#each events as event (event.id)}
				<div
					class="absolute right-1 left-1 cursor-pointer overflow-hidden rounded p-1 text-white transition-opacity hover:opacity-90"
					style="top: {getEventStyle(event).top};
                 height: {getEventStyle(event).height};
                 background-color: {getEventStyle(event).backgroundColor};"
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
				</div>
			{/each}
		</div>
	</div>
</div>
