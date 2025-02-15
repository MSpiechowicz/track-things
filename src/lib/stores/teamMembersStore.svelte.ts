export type TeamMember = {
  id: string;
  name: string;
  email: string;
  created_at: string;
  permissions: string;
};

export const teamMembersStore = $state({
  data: [] as TeamMember[],
  currentMemberId: null as string | null,
  currentMemberName: null as string | null,
  currentMemberEmail: null as string | null,
  currentMemberTeamId: null as string | null,
  currentMemberPermissions: null as string | null,
});
