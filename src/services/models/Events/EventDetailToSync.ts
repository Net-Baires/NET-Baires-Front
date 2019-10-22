import { User } from "../User";

export interface EventDetailToSync {
  id: string;
  title: string;
  description: string;
  platform: string;
  status: string;
  date: Date;
  attendees: User[];
}

export interface EventToReportAssistance {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  status: string;
  date: Date;
  token: string;
}
