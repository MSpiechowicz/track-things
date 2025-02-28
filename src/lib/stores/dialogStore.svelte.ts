import type { DialogStoreType } from '$lib/types/dialogStoreType';

export const dialogStore = $state<DialogStoreType>({
  showLogoutDialog: false,
  showAccountSettingsDialog: false,
  showDeleteAccountDialog: false,
  showEventTypesDeleteDialog: false,
	showTeamSettingsCreateDialog: false,
	showTeamSettingsDeleteDialog: false,
	showTeamSettingsMemberDeleteDialog: false,
	showTeamMembersCreateDialog: false,
	showTeamMembersDeleteDialog: false,
	showTrackingDeleteDialog: false,
	closeAll: () => {
		dialogStore.showLogoutDialog = false;
		dialogStore.showAccountSettingsDialog = false;
		dialogStore.showDeleteAccountDialog = false;
		dialogStore.showEventTypesDeleteDialog = false;
		dialogStore.showTeamSettingsCreateDialog = false;
		dialogStore.showTeamSettingsDeleteDialog = false;
		dialogStore.showTeamSettingsMemberDeleteDialog = false;
		dialogStore.showTeamMembersCreateDialog = false;
		dialogStore.showTeamMembersDeleteDialog = false;
    dialogStore.showTrackingDeleteDialog = false;
	}
});
