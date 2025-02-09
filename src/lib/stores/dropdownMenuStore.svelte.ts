interface DropdownMenuStore {
  showUserMenu: boolean;
  closeAll: () => void;
}

export const dropdownMenuStore = $state<DropdownMenuStore>({
  showUserMenu: false,
  closeAll: () => {
    dropdownMenuStore.showUserMenu = false;
  }
});
