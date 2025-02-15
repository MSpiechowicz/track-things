<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { dashboardStore } from '$lib/stores/dashboardStore.svelte';

	import IconArrowBack from '$lib/components/svg/IconArrowBack.svelte';

	const { title, children } = $props();
</script>

<div class="mt-1 flex flex-1 flex-col">
	<div class="flex flex-row items-start justify-between">
		<h2 class="text-2xl font-bold">{title}</h2>
		{#if dashboardStore.isChildView}
			<Button
				variant="secondary"
				class="max-w-fit text-black"
				onclick={() => {
					dashboardStore.goBack();
				}}
			>
				<IconArrowBack additionalClass="!h-5 !w-5" strokeColor="black" />
				Go Back
			</Button>
		{/if}
	</div>
	{@render children()}
</div>
