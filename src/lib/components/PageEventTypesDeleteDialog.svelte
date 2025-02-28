<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import PageDialog from '$lib/components/PageDialog.svelte';
	import PageDialogFooter from '$lib/components/PageDialogFooter.svelte';
	import { Button } from '$lib/components/ui/button';
	import { dialogStore } from '$lib/stores/dialogStore.svelte';
	import { eventTypesStore } from '$lib/stores/eventTypesStore.svelte';
	import { t } from '$lib/translations';
	import { eventTypesTimer } from '$lib/utils/timers/defaults';
	import { toast } from 'svelte-sonner';

	async function handleDelete(id: string | null) {
		const response = await fetch(`/api/v1/event-types/delete?id=${id}`, {
			method: 'DELETE'
		});

		const result = await response.json();

		if (result.success) {
			eventTypesStore.data = eventTypesStore.data.filter((entry) => entry.id !== id);
			eventTypesStore.resetCurrentEventType();

			dialogStore.showEventTypesDeleteDialog = false;

			eventTypesTimer.reset();

			invalidateAll();

			toast.success(t('eventTypes.dialog.delete.toast.success.title'), {
				description: t('eventTypes.dialog.delete.toast.success.description')
			});
		} else {
			toast.error(t('eventTypes.dialog.delete.toast.error.title'), {
				description: t('eventTypes.dialog.delete.toast.error.description')
			});
		}
	}
</script>

<PageDialog
	open={dialogStore.showEventTypesDeleteDialog}
	onOpenChange={() => {
		dialogStore.showEventTypesDeleteDialog = false;
		eventTypesStore.resetCurrentEventType();
	}}
	dialogTitle={t('eventTypes.dialog.delete.title')}
	dialogDescription={t('eventTypes.dialog.delete.description', {
		1: eventTypesStore.currentEventTypeTitle ?? ''
	})}
>
	<PageDialogFooter
		onCancelClick={() => {
			dialogStore.showEventTypesDeleteDialog = false;
			eventTypesStore.resetCurrentEventType();
		}}
	>
		<Button
			variant="destructive"
			onclick={() => handleDelete(eventTypesStore.currentEventTypeId)}
			>{t('eventTypes.dialog.delete.button.delete.label')}</Button
		>
	</PageDialogFooter>
</PageDialog>
