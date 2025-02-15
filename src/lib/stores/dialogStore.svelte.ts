interface DialogStore {
  showLogout: boolean;
  showAccountSettings: boolean;
  showDeleteAccount: boolean;
  showTeamSettingsDelete: boolean;
  showTeamMembersCreate: boolean;
  showTeamMembersDelete: boolean;
  closeAll: () => void;
}

export const dialogStore = $state<DialogStore>({
  showLogout: false,
  showAccountSettings: false,
  showDeleteAccount: false,
	showTeamSettingsDelete: false,
	showTeamMembersCreate: false,
	showTeamMembersDelete: false,
	closeAll: () => {
		dialogStore.showLogout = false;
		dialogStore.showAccountSettings = false;
		dialogStore.showDeleteAccount = false;
		dialogStore.showTeamSettingsDelete = false;
		dialogStore.showTeamMembersCreate = false;
		dialogStore.showTeamMembersDelete = false;
	}
});
