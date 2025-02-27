<script lang="ts">
	import { cn } from '$lib/utils';

	type Color = {
		value: string;
		label: string;
	};

	type $$Props = {
		value?: string;
		colors?: Color[];
		class?: string;
	};

	export let value: $$Props['value'] = undefined;
	export let colors: NonNullable<$$Props['colors']> = [
		{ value: '#3b82f6', label: 'Blue' },
		{ value: '#10b981', label: 'Green' },
		{ value: '#f59e0b', label: 'Amber' },
		{ value: '#ef4444', label: 'Red' },
		{ value: '#8b5cf6', label: 'Purple' },
		{ value: '#ec4899', label: 'Pink' }
	];

	let className: $$Props['class'] = undefined;
	export { className as class };
</script>

<div class={cn('flex gap-2', className)}>
	{#each colors as color}
		<button
			type="button"
			class="h-8 w-8 rounded-full border-2 transition-all"
			style="background-color: {color.value}; border-color: {value === color.value
				? 'white'
				: color.value}; outline: {value === color.value ? '2px solid ' + color.value : 'none'};"
			aria-label={color.label}
			on:click={() => (value = color.value)}
		></button>
	{/each}
</div>
