<script lang="ts">
	import { hexToHSL, hslToHex } from './color-utils';

	let { value = $bindable() } = $props<{
		value?: string;
	}>();

	// HSL state
	let hsl = $state(hexToHSL(value || '#155dfc'));

	// Update color when HSL changes
	$effect(() => {
		value = hslToHex(hsl.h, hsl.s, hsl.l);
	});

	// Update HSL when color changes externally
	$effect(() => {
		if (value) {
			const newHsl = hexToHSL(value);
			if (newHsl.h !== hsl.h || newHsl.s !== hsl.s || newHsl.l !== hsl.l) {
				hsl = newHsl;
			}
		}
	});
</script>

<div class="flex flex-col gap-4 p-0 w-full max-w-sm">
	<!-- Color preview -->
	<div
		class="h-16 w-full rounded-md border-2 transition-all text-white p-4 flex items-center"
		style="background-color: {value}; border-color: {value};"
		role="img"
		aria-label="Color preview: {value}"
	>Event Color Test</div>

	<!-- HSL Sliders -->
	<div class="space-y-2">
		<!-- Hue slider -->
		<div class="space-y-2">
			<label for="hue-slider" class="text-sm">
				Hue: {Math.round(hsl.h)}°
			</label>
			<div class="relative h-4 rounded-md" style="background: linear-gradient(to right,
				hsl(0, 100%, 50%),
				hsl(60, 100%, 50%),
				hsl(120, 100%, 50%),
				hsl(180, 100%, 50%),
				hsl(240, 100%, 50%),
				hsl(300, 100%, 50%),
				hsl(360, 100%, 50%));">
				<input
					id="hue-slider"
					type="range"
					min="0"
					max="360"
					bind:value={hsl.h}
					class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
				/>
				<div
					class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-sm pointer-events-none"
					style="left: calc({(hsl.h / 360) * 100}% - 8px); background-color: hsl({hsl.h}, 100%, 50%);"
				></div>
			</div>
		</div>

		<!-- Saturation slider -->
		<div class="space-y-2">
			<label for="saturation-slider" class="text-sm">
				Saturation: {Math.round(hsl.s)}%
			</label>
			<div class="relative h-4 rounded-md" style="background: linear-gradient(to right,
				hsl({hsl.h}, 0%, {hsl.l}%),
				hsl({hsl.h}, 100%, {hsl.l}%));">
				<input
					id="saturation-slider"
					type="range"
					min="0"
					max="100"
					bind:value={hsl.s}
					class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
				/>
				<div
					class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-sm pointer-events-none"
					style="left: calc({hsl.s}% - 8px); background-color: hsl({hsl.h}, {hsl.s}%, {hsl.l}%);"
				></div>
			</div>
		</div>

		<!-- Lightness slider -->
		<div class="space-y-2">
			<label for="lightness-slider" class="text-sm">
				Lightness: {Math.round(hsl.l)}%
			</label>
			<div class="relative h-4 rounded-md" style="background: linear-gradient(to right,
				hsl({hsl.h}, {hsl.s}%, 0%),
				hsl({hsl.h}, {hsl.s}%, 50%),
				hsl({hsl.h}, {hsl.s}%, 100%));">
				<input
					id="lightness-slider"
					type="range"
					min="0"
					max="100"
					bind:value={hsl.l}
					class="absolute inset-0 h-full w-full cursor-pointer opacity-0"
				/>
				<div
					class="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-sm pointer-events-none"
					style="left: calc({hsl.l}% - 8px); background-color: hsl({hsl.h}, {hsl.s}%, {hsl.l}%);"
				></div>
			</div>
		</div>
	</div>
</div>
