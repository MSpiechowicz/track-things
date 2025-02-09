interface UserStore {
  id: string | undefined;
  name: string | undefined;
  email: string | undefined;
  displayName: string | undefined;
  hideEmail: boolean | undefined;
}

export const userStore = $state<UserStore>({
  id: undefined,
  name: undefined,
  email: undefined,
  displayName: undefined,
  hideEmail: false,
});
