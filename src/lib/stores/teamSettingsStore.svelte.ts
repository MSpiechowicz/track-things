import type { TeamMemberType } from '$lib/types/teamMemberType';
import type { TeamSettingType } from '$lib/types/teamSettingsType';

export const teamSettingsStore = $state({
  data: [] as TeamSettingType[],
  showUpdateView: false as boolean,
  currentTeamMembers: [] as TeamMemberType[],
  currentTeamId: null as string | null,
  currentTeamName: null as string | null,
});
