import {
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
} from "./requestServices";
import { EventInformation } from "./models/Member";

export const addEventInformation = (
  eventId: number,
  eventInformation: EventInformation
): Promise<void> =>
  postRequest(`/events/${eventId}/information`, eventInformation);

export const removeEventInformation = (
  eventId: number,
  eventInformationId: number
): Promise<void> =>
  deleteRequest(`/events/${eventId}/information/${eventInformationId}`);

export const getEventInformation = (
  eventId: number
): Promise<EventInformation[]> => getRequest(`/events/${eventId}/information`);

export const getVisibleEventInformation = (
  eventId: number
): Promise<EventInformation[]> =>
  getRequest(`/events/${eventId}/information?visible=true`);

export const updateEventInformation = (
  eventId: number,
  eventInformationId: number,
  eventInformation: EventInformation
): Promise<void> =>
  putRequest(
    `/events/${eventId}/information/${eventInformationId}`,
    eventInformation
  );
