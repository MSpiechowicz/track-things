<script lang="ts">
	import PageCalendarLeftHeader from './PageCalendarLeftHeader.svelte';
	import PageCalendarMiddleHeader from './PageCalendarMiddleHeader.svelte';
	import PageCalendarRightHeader from './PageCalendarRightHeader.svelte';
</script>

<div class="flex w-full justify-between flex-col gap-4 md:flex-row">
	<PageCalendarLeftHeader />
	<PageCalendarMiddleHeader />
	<PageCalendarRightHeader />
</div>
