export type EventType = {
  id: string;
  title: string;
  color: string;
  teams: { id: string; team_name: string }[];
  created_at: string;
  updated_at: string;
};
