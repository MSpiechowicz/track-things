<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { DialogFooter } from '$lib/components/ui/dialog';

	const { onCancelClick, children } = $props();
</script>

<DialogFooter class="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-2">
	<Button variant="outline" onclick={onCancelClick}>Cancel</Button>
	{@render children()}
</DialogFooter>
