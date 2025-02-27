import type { EventType } from "./eventType";

export type CalendarEventType = {
  id: string;
  title: string;
  color: string;
  duration: number;
  description: string;
  type: EventType;
  date: Date;
};
