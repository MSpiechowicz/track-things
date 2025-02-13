type TeamSetting = {
  id: number;
  name: string;
  updated_at: string;
};

export const teamSettingsStore = $state({
  data: [] as TeamSetting[],
  deleteTeamSettingId: null as number | null,
  deleteTeamSettingName: null as string | null,
});
