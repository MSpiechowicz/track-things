import type { TeamMemberType } from '$lib/types/teamMemberType';

export type TeamSettingType = {
  id: string;
  name: string;
  members: TeamMemberType[];
  updated_at: string;
};
