import type { TeamMemberType } from '$lib/types/teamMemberType';

export type TeamSettingOwnerType = {
  id: string;
  name: string;
  members: TeamMemberType[];
  updated_at: string;
};
