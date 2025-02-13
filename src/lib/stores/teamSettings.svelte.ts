type TeamSetting = {
  id: number;
  name: string;
  updated_at: string;
};

export const teamSettingsStore = $state({
  data: [] as TeamSetting[],
});
