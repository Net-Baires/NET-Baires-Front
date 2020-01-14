import { getRequest, putRequest } from "./requestServices";
import { EventsAttendees } from "./models/EventsAttendees";

export const getAttendees = (idEvent: number): Promise<EventsAttendees[]> => {
  return getRequest(`/events/${idEvent}/attendees`);
};
export const getAttendeesByQuery = (idEvent: number): (query: string) => Promise<EventsAttendees[]> => {
  return (query: string) => getRequest<EventsAttendees[]>(`/events/${idEvent}/attendees?query=${query}`);
};
export const updateAttende = (
  idEvent: number,
  memberid: number,
  attende: EventsAttendees
): Promise<EventsAttendees[]> => {
  return putRequest(`/events/${idEvent}/members/${memberid}/attende`, attende);
};

export const getAttendeeDetail = (
  idEvent: number,
  memberid: number
): Promise<EventsAttendees> => {
  return getRequest(`/events/${idEvent}/attendees?memberid=${memberid}`);
};
