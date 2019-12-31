import { Member } from "../Member";

export interface EventDetailToSync {
  id: string;
  title: string;
  description: string;
  platform: string;
  status: string;
  date: Date;
  attendees: Member[];
}

export interface CheckAttendanceGeneralResponse {
  eventId: number;
}