<script lang="ts">
	import { nanoid } from 'nanoid';
	import EventDialog from './EventDialog.svelte';
	import PageCalendarBodyDay from './PageCalendarBodyDay.svelte';

	// Define props using Svelte 5 runes
	const { date = new Date(), view = 'day' } = $props<{
		date?: Date;
		view?: 'day' | 'week' | 'month';
	}>();

	// Sample events data for demonstration
	const events = $state([
		{
			id: '1',
			title: 'Team Meeting',
			start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 9, 15),
			end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 10, 10),
			color: '#3b82f6' // blue
		},
		{
			id: '2',
			title: 'Lunch Break',
			start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0),
			end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0),
			color: '#10b981' // green
		},
		{
			id: '3',
			title: 'Project Review',
			start: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 14, 0),
			end: new Date(date.getFullYear(), date.getMonth(), date.getDate(), 15, 30),
			color: '#f59e0b' // amber
		}
	]);

	// Available colors for events
	const eventColors = [
		'#3b82f6', // blue
		'#10b981', // green
		'#f59e0b', // amber
		'#ef4444', // red
		'#8b5cf6', // purple
		'#ec4899'  // pink
	];

	// Create a class to manage dialog state
	class DialogState {
		isOpen = $state(false);
		currentEvent = $state<(typeof events)[number] | null>(null);

		open(event: (typeof events)[number] | null) {
			this.currentEvent = event;
			this.isOpen = true;
		}

		close() {
			this.isOpen = false;
			this.currentEvent = null;
		}
	}

	const dialogState = new DialogState();

	// Handle adding a new event
	function handleAddEvent(event: CustomEvent<{ start: Date; end: Date }>) {
		const { start, end } = event.detail;

		// Generate a random color for the new event
		const randomColor = eventColors[Math.floor(Math.random() * eventColors.length)];

		// Create new event
		const newEvent = {
			id: nanoid(), // Generate unique ID
			title: 'New Event',
			start,
			end,
			color: randomColor
		};

		// Add to events array
		events.push(newEvent);

		// Open dialog to edit the new event
		dialogState.open(newEvent);
	}

	// Handle clicking on an existing event
	function handleEventClick(event: CustomEvent<{ id: string }>) {
		const { id } = event.detail;
		// Find the clicked event
		const clickedEvent = events.find(e => e.id === id);
		if (clickedEvent) {
			dialogState.open(clickedEvent);
		}
	}

	// Handle saving event from dialog
	function handleSaveEvent(event: CustomEvent<{
		id: string;
		title: string;
		start: Date;
		end: Date;
		color: string;
	}>) {
		const updatedEvent = event.detail;

		// Find and update the event in the array
		const index = events.findIndex(e => e.id === updatedEvent.id);
		if (index !== -1) {
			events[index] = updatedEvent;
		}

		// Close dialog
		dialogState.close();
	}

	// Handle deleting event
	function handleDeleteEvent(event: CustomEvent<{ id: string }>) {
		const { id } = event.detail;

		// Remove event from array
		const index = events.findIndex(e => e.id === id);
		if (index !== -1) {
			events.splice(index, 1);
		}

		// Close dialog
		dialogState.close();
	}
</script>

<div class="flex flex-1 flex-col overflow-hidden">
	{#if view === 'day'}
		<PageCalendarBodyDay
			{date}
			{events}
			on:addEvent={handleAddEvent}
			on:eventClick={handleEventClick}
		/>
	{:else if view === 'week'}
		<!-- Week view will be implemented later -->
		<div class="flex h-full items-center justify-center text-xl text-gray-500">
			Week view coming soon
		</div>
	{:else if view === 'month'}
		<!-- Month view will be implemented later -->
		<div class="flex h-full items-center justify-center text-xl text-gray-500">
			Month view coming soon
		</div>
	{/if}

	<!-- Event Dialog -->
	<EventDialog
		open={dialogState.isOpen}
		event={dialogState.currentEvent}
		on:close={() => dialogState.close()}
		on:save={handleSaveEvent}
		on:delete={handleDeleteEvent}
	/>
</div>
