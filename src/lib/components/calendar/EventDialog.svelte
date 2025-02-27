<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Dialog from '$lib/components/ui/dialog';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { createEventDispatcher } from 'svelte';

	// Define props using Svelte 5 runes
	const { open = false, event = null } = $props<{
		open?: boolean;
		event?: {
			id: string;
			title: string;
			start: Date;
			end: Date;
			color?: string;
		} | null;
	}>();

	// Setup event dispatcher
	const dispatch = createEventDispatcher<{
		close: void;
		save: {
			id: string;
			title: string;
			start: Date;
			end: Date;
			color: string;
		};
		delete: { id: string };
	}>();

	// Local state for form values
	let title = $state(event?.title || 'New Event');
	let startTime = $state('');
	let endTime = $state('');
	let color = $state(event?.color || '#3b82f6');

	// Available colors for events
	const eventColors = [
		{ value: '#3b82f6', label: 'Blue' },
		{ value: '#10b981', label: 'Green' },
		{ value: '#f59e0b', label: 'Amber' },
		{ value: '#ef4444', label: 'Red' },
		{ value: '#8b5cf6', label: 'Purple' },
		{ value: '#ec4899', label: 'Pink' }
	];

	// Format date to time string (HH:MM)
	function formatTimeForInput(date: Date): string {
		return date.toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit',
			hour12: false
		});
	}

	// Initialize form values when event changes
	$effect(() => {
		if (event) {
			title = event.title;
			startTime = formatTimeForInput(event.start);
			endTime = formatTimeForInput(event.end);
			color = event.color || '#3b82f6';
		}
	});

	// Handle form submission
	function handleSave() {
		if (!event) return;

		// Parse time strings
		const [startHours, startMinutes] = startTime.split(':').map(Number);
		const [endHours, endMinutes] = endTime.split(':').map(Number);

		// Create new date objects with updated times
		const newStart = new Date(event.start);
		newStart.setHours(startHours, startMinutes);

		const newEnd = new Date(event.end);
		newEnd.setHours(endHours, endMinutes);

		// Dispatch save event
		dispatch('save', {
			id: event.id,
			title,
			start: newStart,
			end: newEnd,
			color
		});
	}

	// Handle delete
	function handleDelete() {
		if (!event) return;
		dispatch('delete', { id: event.id });
	}

	// Handle close
	function handleClose() {
		dispatch('close');
	}
</script>

<Dialog.Root {open} onOpenChange={handleClose}>
	<Dialog.Portal>
		<Dialog.Overlay />
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>{event?.id ? 'Edit Event' : 'New Event'}</Dialog.Title>
				<Dialog.Description>
					Make changes to your event here. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>

			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="title" class="text-right">Title</Label>
					<Input id="title" bind:value={title} class="col-span-3" />
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="start-time" class="text-right">Start Time</Label>
					<Input id="start-time" type="time" bind:value={startTime} class="col-span-3" />
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="end-time" class="text-right">End Time</Label>
					<Input id="end-time" type="time" bind:value={endTime} class="col-span-3" />
				</div>

				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Color</Label>
					<div class="col-span-3 flex gap-2">
						{#each eventColors as eventColor}
							<button
								type="button"
								class="h-8 w-8 rounded-full border-2 transition-all"
								style="background-color: {eventColor.value}; border-color: {color === eventColor.value
									? 'white'
									: eventColor.value}; outline: {color === eventColor.value
									? '2px solid ' + eventColor.value
									: 'none'};"
								aria-label={eventColor.label}
								onclick={() => (color = eventColor.value)}
							></button>
						{/each}
					</div>
				</div>
			</div>

			<Dialog.Footer>
				{#if event?.id}
					<Button variant="destructive" onclick={handleDelete}>Delete</Button>
					<div class="flex-1"></div>
				{/if}
				<Button variant="outline" onclick={handleClose}>Cancel</Button>
				<Button onclick={handleSave}>Save</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
