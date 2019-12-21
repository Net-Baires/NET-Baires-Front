export interface EventsAttendees {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  picture: string;
  organizer: boolean;
  speaker: boolean;
  didNotAttend: boolean;
  attended: boolean;
  notifiedAbsence: boolean;
  doNotKnow: boolean;
}
