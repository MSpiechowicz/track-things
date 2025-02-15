type TeamSetting = {
  id: string;
  name: string;
  updated_at: string;
};

type TeamMember = {
  id: string;
  email: string;
  joined_at: string;
};

export const teamSettingsStore = $state({
  data: [] as TeamSetting[],
  updateView: false as boolean,
  members: [] as TeamMember[],
  deleteTeamSettingId: null as string | null,
  deleteTeamSettingName: null as string | null,
  deleteTeamMemberId: null as string | null,
  deleteTeamMemberName: null as string | null,
  deleteTeamMemberEmail: null as string | null,
  updateTeamSettingId: null as string | null,
  updateTeamSettingName: null as string | null,
  updateTeamSettingEmails: [] as string[] | null,
  updateTeamSettingMembers: [] as TeamMember[] | null,
});
