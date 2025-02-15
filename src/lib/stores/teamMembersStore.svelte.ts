export type TeamMember = {
  id: string;
  email: string;
  created_at: string;
};

export const teamMembersStore = $state({
  data: [] as TeamMember[],
  currentMemberId: null as string | null,
  currentMemberEmail: null as string | null,
  currentMemberTeamId: null as string | null,
});
