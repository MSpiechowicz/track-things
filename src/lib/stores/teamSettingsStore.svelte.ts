type TeamSetting = {
  id: number;
  name: string;
  updated_at: string;
};

export const teamSettingsStore = $state({
  data: [] as TeamSetting[],
  updateView: false as boolean,
  deleteTeamSettingId: null as number | null,
  deleteTeamSettingName: null as string | null,
  updateTeamSettingId: null as number | null,
  updateTeamSettingName: null as string | null,
});
