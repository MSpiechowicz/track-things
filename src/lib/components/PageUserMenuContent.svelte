<script lang="ts">
	import {
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator
	} from '$lib/components/ui/dropdown-menu';
	import { dialog } from '$lib/stores/dialogStore.svelte';
  import { userStore } from '$lib/stores/userStore.svelte';

	import IconUserConfig from '$lib/components/svg/IconUserConfig.svelte';
	import IconUserSignOut from '$lib/components/svg/IconUserSignOut.svelte';
</script>

<DropdownMenuLabel>
	<div class="flex flex-col">
		<p class="text-lg font-medium">{userStore.displayName}</p>
    {#if userStore.hideEmail === false}
      <p class="text-sm font-normal">{userStore.email}</p>
    {/if}
	</div>
</DropdownMenuLabel>

<DropdownMenuSeparator class="mx-2 my-2 bg-neutral-200" />

<div class="flex flex-col gap-1">
	<DropdownMenuItem
		onclick={() => (dialog.showAccountSettings = true)}
		class="flex items-center gap-2 text-base"
	>
		<IconUserConfig additionalClass="w-5 h-5" strokeColor="black" />
		Account Settings
	</DropdownMenuItem>
	<DropdownMenuItem
		onclick={() => (dialog.showLogout = true)}
		class="flex items-center gap-2 text-base"
	>
		<IconUserSignOut additionalClass="w-5 h-5" strokeColor="black" />
		Sign Out
	</DropdownMenuItem>
</div>
