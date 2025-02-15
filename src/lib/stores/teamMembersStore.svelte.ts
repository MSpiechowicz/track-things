import type { TeamMemberType } from '$lib/types/teamMemberType';

export const teamMembersStore = $state({
  data: [] as TeamMemberType[],
  currentMemberId: null as string | null,
  currentMemberName: null as string | null,
  currentMemberEmail: null as string | null,
  currentMemberTeamId: null as string | null,
  currentMemberPermissions: null as string | null,
});
