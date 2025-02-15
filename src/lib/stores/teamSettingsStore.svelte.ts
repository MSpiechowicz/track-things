type TeamSetting = {
  id: number;
  name: string;
  updated_at: string;
};

type TeamMember = {
  id: number;
  email: string;
  joined_at: string;
};

export const teamSettingsStore = $state({
  data: [] as TeamSetting[],
  updateView: false as boolean,
  members: [] as TeamMember[],
  deleteTeamSettingId: null as number | null,
  deleteTeamSettingName: null as string | null,
  deleteTeamMemberId: null as number | null,
  deleteTeamMemberName: null as string | null,
  deleteTeamMemberEmail: null as string | null,
  updateTeamSettingId: null as number | null,
  updateTeamSettingName: null as string | null,
  updateTeamSettingEmails: [] as string[] | null,
  updateTeamSettingMembers: [] as TeamMember[] | null,
});
