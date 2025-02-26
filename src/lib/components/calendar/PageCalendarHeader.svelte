<script lang="ts">
	import PageCalendarLeftHeader from './PageCalendarLeftHeader.svelte';
	import PageCalendarMiddleHeader from './PageCalendarMiddleHeader.svelte';
	import PageCalendarRightHeader from './PageCalendarRightHeader.svelte';
</script>

<div class="flex flex-1 flex-col gap-4 md:flex-row">
	<PageCalendarLeftHeader />
	<PageCalendarMiddleHeader />
	<PageCalendarRightHeader />
</div>
