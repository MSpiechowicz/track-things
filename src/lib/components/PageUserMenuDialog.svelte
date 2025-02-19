<script lang="ts">
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
</script>

<PageDialog
	open={dialogStore.showLogoutDialog}
	onOpenChange={() => (dialogStore.showLogoutDialog = false)}
	dialogTitle="Sign Out"
	dialogDescription="Are you sure you want to sign out of your account?"
>
	<PageDialogFooter onCancelClick={() => (dialogStore.showLogoutDialog = false)}>
		<Button variant="destructive" href="/auth/logout">Sign Out</Button>
	</PageDialogFooter>
</PageDialog>
