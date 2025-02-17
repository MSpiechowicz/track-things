import type { TeamMemberType } from "./teamMemberType";

export type TeamSettingOwnerType = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  tracking_ids: string[];
  members: TeamMemberType[];
};
