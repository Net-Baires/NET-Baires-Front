import { EventDetail, UpdateEvent } from "./models/Events/Event";
import { MeEvent } from "./models/Events/MeEvent";
import { EventToSync } from "./models/Events/EventToSync";
import {
  EventDetailToSync,
  EventToReportAssistance
} from "./models/Events/EventDetailToSync";
import { Config } from "./config";
import { getToken } from "./authService";
import { getRequest, putRequest } from "./requestServices";

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

export const getEventsLive = (): Promise<EventToSync[]> => {
  return getRequest("/events/live");
};

export const updateEvent = (
  id: number,
  event: UpdateEvent
): Promise<UpdateEvent> => {
  return fetch(`${Config.api.baseRemote}/events/${id}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: JSON.stringify(event)
  }).then((x: any) => x.json());
};

export const getEvent = (id: number): Promise<EventDetail> =>
  getRequest(`/events/${id}`);

export const getEventToReportAssitance = (
  id: number
): Promise<EventToReportAssistance> => getRequest(`/events/${id}/assistance`);
export const getCheckAssistanceGeneral = (
  id: number
): Promise<EventToReportAssistance> =>
  getRequest(`/events/${id}/assistance/general`);

export const reportAssitance = (token: string): Promise<EventToSync> => {
  return fetch(`${Config.api.baseRemote}/events/Assistance/${token}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`
    },
    body: ""
  }).then((x: any) => x.json());
};
export const reportAssitanceGeneral = (token: string): Promise<EventToSync> => {
  return putRequest(`${Config.api.baseRemote}/assistance/general/${token}`);
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
