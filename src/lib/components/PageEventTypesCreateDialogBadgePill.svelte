<script lang="ts">
	import { Badge } from '$lib/components/ui/badge';
	import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
	import IconTrash from './svg/IconTrash.svelte';

	let { label } = $props();

	function removeTeam(e: Event) {
		e.preventDefault();

		eventTypesStore.currentEventTypeCollaborators =
			eventTypesStore.currentEventTypeCollaborators.filter((name) => name !== label);
	}
</script>

<Badge class="bg-blue-600 p-2 text-white rounded-md min-h-[42px]">
	{label}
	<button onclick={removeTeam} class="ml-1 cursor-pointer">
		<IconTrash additionalClass="h-4 w-4" />
	</button>
</Badge>
