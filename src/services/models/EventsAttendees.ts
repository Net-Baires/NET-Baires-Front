import { EventToReportAttendanceDetail } from './Events/EventToReportAttendance';

export interface EventsAttendees {
  status?: string;
  organizer?: boolean;
  speaker?: boolean;
  attended?: boolean;
  notifiedAbsence?: boolean;
  doNotKnow?: boolean;
  didNotAttend?: boolean;
  averageAttendance: number;
  memberDetail?: EventsAttendeesMemberDetail;
  event?: EventToReportAttendanceDetail;
}
export interface EventsAttendeesMemberDetail {
  id?: number;
  firstName?: string;
  firstLogin?: string;
  picture?: string;
  blocked?: boolean;
  organized?: boolean;
  colaborator?: boolean;
}
