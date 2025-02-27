export type EventType = {
  id: string;
  title: string;
  color: string;
  teams: { id: string; name: string }[];
  created_at: string;
  updated_at: string;
};
