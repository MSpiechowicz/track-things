<script lang="ts">
	import {
		Dialog,
		DialogContent,
		DialogDescription,
		DialogHeader,
		DialogTitle
	} from '$lib/components/ui/dialog';

	const { open, onOpenChange, dialogTitle, dialogDescription, children } = $props();
</script>

<Dialog {open} {onOpenChange}>
	<DialogContent class="w-[325px] rounded-xl border sm:w-full">
		<DialogHeader>
			<DialogTitle class="text-xl text-left">{@html dialogTitle}</DialogTitle>
			<DialogDescription class="text-base text-neutral-600 text-left">{@html dialogDescription}</DialogDescription>
		</DialogHeader>
		{@render children()}
	</DialogContent>
</Dialog>
