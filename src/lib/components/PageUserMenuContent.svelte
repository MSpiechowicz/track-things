<script lang="ts">
	import {
		DropdownMenuLabel,
		DropdownMenuSeparator,
		DropdownMenuItem
	} from '$lib/components/ui/dropdown-menu';
	import { accountSettings } from '$lib/stores/accountSettingStore.svelte';
	import { dialog } from '$lib/stores/dialogStore.svelte';

	import IconUser from '$lib/components/svg/IconUser.svelte';
	import IconLogout from '$lib/components/svg/IconLogout.svelte';

	const { name, email } = $props();
</script>

<DropdownMenuLabel>
	<div class="flex flex-col">
		<p class="text-lg font-medium">{name}</p>
		<p class="text-sm font-normal">{email}</p>
	</div>
</DropdownMenuLabel>

<DropdownMenuSeparator class="mx-2 my-2 bg-neutral-200" />

<div class="flex flex-col gap-1">
	<DropdownMenuItem onclick={() => (accountSettings.show = true)} class="text-base">
		<div class="bg-custom-dark mr-1 flex h-7 w-7 items-center justify-center rounded-full">
			<IconUser additionalClass="w-5 h-5" />
		</div>
		Account Settings
	</DropdownMenuItem>
	<DropdownMenuItem onclick={() => (dialog.showLogout = true)} class="text-base">
		<div class="bg-custom-dark mr-1 flex h-7 w-7 items-center justify-center rounded-full">
			<IconLogout additionalClass="w-5 h-5" />
		</div>
		Sign Out
	</DropdownMenuItem>
</div>
