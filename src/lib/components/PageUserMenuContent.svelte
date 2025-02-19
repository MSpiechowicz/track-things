<script lang="ts">
	import IconUserConfig from '$lib/components/svg/IconUserConfig.svelte';
	import IconUserSignOut from '$lib/components/svg/IconUserSignOut.svelte';
	import {
		DropdownMenuItem,
		DropdownMenuLabel,
		DropdownMenuSeparator
	} from '$lib/components/ui/dropdown-menu';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { userStore } from '$lib/stores/userStore.svelte';
</script>

<DropdownMenuLabel>
	<div class="flex flex-col">
		<p class="text-lg font-bold">{userStore.displayName}</p>
		<p class="text-sm font-normal">{userStore.email}</p>
	</div>
</DropdownMenuLabel>

<DropdownMenuSeparator class="mx-2 my-2 bg-neutral-200" />

<div class="flex flex-col gap-1">
	<DropdownMenuItem
		onclick={() => (dialogStore.showAccountSettingsDialog = true)}
		class="flex items-center gap-2 text-base"
	>
		<IconUserConfig additionalClass="w-5 h-5" strokeColor="black" />
		Account Settings
	</DropdownMenuItem>
	<DropdownMenuItem
		onclick={() => (dialogStore.showLogoutDialog = true)}
		class="flex items-center gap-2 text-base mb-1"
	>
		<IconUserSignOut additionalClass="w-5 h-5" strokeColor="black" />
		Sign Out
	</DropdownMenuItem>
</div>
