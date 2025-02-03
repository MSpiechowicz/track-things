<script lang="ts">
	interface SubContent {
		title: string;
		content: string;
	}

	export let title: string;
	export let content: string;
	export let subcontent: SubContent[] = [];
	export let sectionNumber: string;
</script>

<section class="mb-8">
	<h2 class="mb-4 text-2xl font-semibold">
		{sectionNumber}. {title}
	</h2>
	<p class="mb-4 max-w-[80ch]">{content}</p>
	{#if subcontent.length > 0}
		<ul class="list-inside list-disc space-y-4 pl-4">
			{#each subcontent as item}
				<li>
					<span class="font-semibold">{item.title}:</span>
					{item.content}
				</li>
			{/each}
		</ul>
	{/if}
</section>
