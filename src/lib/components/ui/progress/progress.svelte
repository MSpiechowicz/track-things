<script lang="ts">
	import { cn } from "$lib/utils.js";
	import { Progress as ProgressPrimitive } from "bits-ui";

	type $$Props = ProgressPrimitive.Props;

	let className: $$Props["class"] = undefined;
	export let value: $$Props["value"] = undefined;
	export { className as class };
</script>

<ProgressPrimitive.Root
	class={cn("relative h-2 w-full overflow-hidden rounded-full bg-white", className)}
	{...$$restProps}
>
	<div
		class="h-full w-full flex-1 bg-blue-600 transition-all dark:bg-blue-600"
		style={`transform: translateX(-${100 - (value ?? 0)}%)`}
	></div>
</ProgressPrimitive.Root>
