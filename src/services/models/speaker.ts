import { EventsAttendees } from './EventsAttendees';
export interface Speaker {
  memberId: number;
  firstName: string;
  lastName: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  biography: string;
  github: string;
  picture: string;
  blocked: boolean;
  colaborator: boolean;
  organized: boolean;
  counEventsAsSpeaker: number;
  averageAttendance: number;
  events: EventsAttendees[];
}
