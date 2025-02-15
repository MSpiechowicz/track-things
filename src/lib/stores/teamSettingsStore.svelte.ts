import type { TeamMember } from '$lib/types/teamMember';
import type { TeamSetting } from '$lib/types/teamSettings';

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
});
