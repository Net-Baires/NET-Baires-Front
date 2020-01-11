import { EventsAttendees } from './EventsAttendees';
import { EventDetail } from './Events/Event';
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
  countEventsAsSpeaker: number;
  averageAttendance: number;
  events: EventDetail[];
}
