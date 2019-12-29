export interface EventsAttendees {
  status?: string;
  organizer?: boolean;
  speaker?: boolean;
  attended?: boolean;
  notifiedAbsence?: boolean;
  doNotKnow?: boolean;
  didNotAttend?: boolean;
  memberDetail?: EventsAttendeesMemberDetail;
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
