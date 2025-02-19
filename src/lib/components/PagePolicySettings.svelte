<script lang="ts">
  import type { PolicySubContentType } from "$lib/types/policySubContentType";

	const { title, content, subcontent = [] as PolicySubContentType[], sectionNumber } = $props();
</script>

<section class="mb-8 max-w-[80ch]">
	<h2 class="mb-4 text-2xl font-semibold">
		{sectionNumber}. {title}
	</h2>
	<p class="mb-4">{content}</p>
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
