import type { DialogStore } from '$lib/types/dialogStore';

export const dialogStore = $state<DialogStore>({
  showLogoutDialog: false,
  showAccountSettingsDialog: false,
  showDeleteAccountDialog: false,
	showTeamSettingsDeleteDialog: false,
	showTeamMembersCreateDialog: false,
	showTeamMembersDeleteDialog: false,
	closeAll: () => {
		dialogStore.showLogoutDialog = false;
		dialogStore.showAccountSettingsDialog = false;
		dialogStore.showDeleteAccountDialog = false;
		dialogStore.showTeamSettingsDeleteDialog = false;
		dialogStore.showTeamMembersCreateDialog = false;
		dialogStore.showTeamMembersDeleteDialog = false;
	}
});
