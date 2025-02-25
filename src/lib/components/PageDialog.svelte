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
			<DialogTitle class="text-left text-xl">{@html dialogTitle}</DialogTitle>
			<DialogDescription class="text-left text-base text-neutral-600"
				>{@html dialogDescription}</DialogDescription
			>
		</DialogHeader>
		{@render children()}
	</DialogContent>
</Dialog>
