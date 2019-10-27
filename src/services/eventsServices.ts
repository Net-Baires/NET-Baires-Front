import { EventDetail, UpdateEvent } from "./models/Events/Event";
import { MeEvent } from "./models/Events/MeEvent";
import { EventToSync } from "./models/Events/EventToSync";
import {
  EventDetailToSync,
  EventToReportAttendance
} from "./models/Events/EventDetailToSync";
import { Config } from "./config";
import { getRequest, putRequest } from "./requestServices";
import { EventsAttendees } from "./models/sponsor";

export const getNextEvent = (): Promise<EventDetail> => {
  return fetch("http://localhost:3000/events/1").then(x => x.json());
};

export const syncEvents = (): Promise<MeEvent[]> => {
  return putRequest("/events/sync");
};
export const syncEvent = (idEvent: number): Promise<MeEvent[]> => {
  return putRequest(`/events/${idEvent}/sync`);
};
export const getEventsToSync = (): Promise<EventToSync[]> =>
  getRequest("/events/ToSync");
export const getEvents = (): Promise<EventDetail[]> => getRequest("/events");
export const getEventLive = (id: number): Promise<EventDetail> =>
  getRequest(`/events/${id}/live`);

export const getEventsLive = (): Promise<EventToSync[]> => {
  return getRequest("/events/live");
};

export const updateEvent = (
  id: number,
  event: UpdateEvent
): Promise<UpdateEvent> => {
  return putRequest(`/events/${id}`, event);
};

export const getEvent = (id: number): Promise<EventDetail> =>
  getRequest(`/events/${id}`);

export const getEventToReportAttendance = (
  id: number
): Promise<EventToReportAttendance> => getRequest(`/events/${id}/attendances`);
export const getCheckAttendanceGeneral = (
  id: number
): Promise<EventToReportAttendance> =>
  getRequest(`/events/${id}/attendances/general`);

export const reportAttendance = (token: string): Promise<EventToSync> => {
  return putRequest(`/events/attendances/${token}`);
};
export const reportAttendanceGeneral = (
  token: string
): Promise<EventToSync> => {
  return putRequest(`/events/attendances/general/${token}`);
};

export const getEventToSync = (
  id: string,
  platform: string
): Promise<EventDetailToSync> => {
  return fetch(`http://localhost:3000/eventsDetail/${id}`).then(x => x.json());
};
export const cancelEventsToSync = (
  event: EventToSync
): Promise<EventToSync> => {
  return fetch("http://localhost:3000/eventsToSync").then(x => x.json());
};
export const syncEventsToSync = (event: EventToSync): Promise<EventToSync> => {
  return fetch("http://localhost:3000/eventsToSync").then(x => x.json());
};
