interface DialogStore {
  showLogout: boolean;
  showAccountSettings: boolean;
  showDeleteAccount: boolean;
  showTeamSettingsDelete: boolean;
  closeAll: () => void;
}

export const dialogStore = $state<DialogStore>({
  showLogout: false,
  showAccountSettings: false,
  showDeleteAccount: false,
  showTeamSettingsDelete: false,
  closeAll: () => {
    dialogStore.showLogout = false;
    dialogStore.showAccountSettings = false;
    dialogStore.showDeleteAccount = false;
    dialogStore.showTeamSettingsDelete = false;
  },
});
