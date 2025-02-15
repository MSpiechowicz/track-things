import type { TeamMember } from '$lib/types/teamMember';
import type { TeamSetting } from '$lib/types/teamSettings';

export const teamSettingsStore = $state({
  data: [] as TeamSetting[],
  showUpdateView: false as boolean,
  currentTeamMembers: [] as TeamMember[],
  currentTeamId: null as string | null,
  currentTeamName: null as string | null,
});
