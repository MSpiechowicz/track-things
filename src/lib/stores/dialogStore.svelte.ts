interface DialogStore {
  showLogout: boolean;
  showAccountSettings: boolean;
  showDeleteAccount: boolean;
  closeAll: () => void;
}

export const dialogStore = $state<DialogStore>({
  showLogout: false,
  showAccountSettings: false,
  showDeleteAccount: false,
  closeAll: () => {
    dialogStore.showLogout = false;
    dialogStore.showAccountSettings = false;
    dialogStore.showDeleteAccount = false;
  },
});
