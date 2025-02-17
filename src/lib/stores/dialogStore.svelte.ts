import type { DialogStoreType } from '$lib/types/dialogStoreType';

export const dialogStore = $state<DialogStoreType>({
  showLogoutDialog: false,
  showAccountSettingsDialog: false,
  showDeleteAccountDialog: false,
	showTeamSettingsDeleteDialog: false,
	showTeamSettingsMemberDeleteDialog: false,
	showTeamMembersCreateDialog: false,
	showTeamMembersDeleteDialog: false,
	closeAll: () => {
		dialogStore.showLogoutDialog = false;
		dialogStore.showAccountSettingsDialog = false;
		dialogStore.showDeleteAccountDialog = false;
		dialogStore.showTeamSettingsDeleteDialog = false;
		dialogStore.showTeamSettingsMemberDeleteDialog = false;
		dialogStore.showTeamMembersCreateDialog = false;
		dialogStore.showTeamMembersDeleteDialog = false;
	}
});
