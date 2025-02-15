import type { TeamMember } from '$lib/types/teamMember';

export const teamMembersStore = $state({
  data: [] as TeamMember[],
  currentMemberId: null as string | null,
  currentMemberName: null as string | null,
  currentMemberEmail: null as string | null,
  currentMemberTeamId: null as string | null,
  currentMemberPermissions: null as string | null,
});
