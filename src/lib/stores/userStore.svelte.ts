interface UserStore {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  displayName: string | undefined;
  hideEmail: boolean | undefined;
  clearData: () => void;
}

export const userStore = $state<UserStore>({
  id: undefined,
  name: undefined,
  email: undefined,
  displayName: undefined,
  hideEmail: false,
  clearData: () => {
    userStore.id = undefined;
    userStore.name = undefined;
    userStore.email = undefined;
    userStore.displayName = undefined;
    userStore.hideEmail = false;
  }
});
