<script lang="ts">
	import { Button } from '$lib/components/ui/button';
  import { userStore } from '$lib/stores/userStore.svelte';
	import {
		DropdownMenu,
		DropdownMenuContent,
		DropdownMenuTrigger
	} from '$lib/components/ui/dropdown-menu';

	import PageAccountSettings from '$lib/components/PageAccountSettings.svelte';
	import PageUserMenuContent from '$lib/components/PageUserMenuContent.svelte';
	import PageUserMenuDialog from '$lib/components/PageUserMenuDialog.svelte';

	import IconMenu from '$lib/components/svg/IconMenu.svelte';
	import IconSettings from '$lib/components/svg/IconSettings.svelte';

  const { isMobile = false } = $props();
</script>

<DropdownMenu>
	<DropdownMenuTrigger asChild let:builder>
		<Button size="icon" builders={[builder]}>
			{#if isMobile}
				<IconMenu additionalClass="h-5 w-5" />
			{:else}
				<IconSettings additionalClass="h-5 w-5" />
			{/if}
		</Button>
	</DropdownMenuTrigger>
	<DropdownMenuContent align="end" class="p-2">
		<PageUserMenuContent />
	</DropdownMenuContent>
</DropdownMenu>

{#if userStore.id}
  <PageAccountSettings />
{/if}

<PageUserMenuDialog />
