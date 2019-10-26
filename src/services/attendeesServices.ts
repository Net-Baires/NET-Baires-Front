import { getRequest, putRequest } from "./requestServices";
import { EventsAttendees } from "./models/sponsor";

export const getAttendees = (idEvent: number): Promise<EventsAttendees[]> => {
  return getRequest(`/events/${idEvent}/attendees`);
};
export const updateAttende = (
  idEvent: number,
  idMember: number,
  attende: EventsAttendees
): Promise<EventsAttendees[]> => {
  return putRequest(`/events/${idEvent}/members/${idMember}/attende`, attende);
};
