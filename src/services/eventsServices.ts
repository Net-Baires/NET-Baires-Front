import {
  EventDetail,
  UpdateEvent,
  GetLinkEventLiveLink,
} from "./models/Events/Event";
import { MeEvent } from "./models/Events/MeEvent";
import { EventToSync } from "./models/Events/EventToSync";
import { CheckAttendanceGeneralResponse } from "./models/Events/EventDetailToSync";
import { EventToReportAttendance } from "./models/Events/EventToReportAttendance";
import {
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
} from "./requestServices";
import { EventLiveDetail } from "./models/Events/EventLiveDetail";
import {
  CreateGroupCodeResponse,
  AddMemberToGroupCodeResponse,
} from "./models/Events/CreateGroupCodeResponse";
import { CompleteEventRequest } from "./models/Member";
import { SpeakerEvent } from "./models/speaker";

export const getNextEvent = (): Promise<EventDetail> => {
  return fetch("http://localhost:3000/events/1").then((x) => x.json());
};

export const syncEvents = (): Promise<MeEvent[]> => {
  return putRequest("/events/sync");
};
export const syncEvent = (idEvent: number): Promise<MeEvent[]> => {
  return putRequest(`/events/${idEvent}/sync`);
};
export const getEventsToSync = (): Promise<EventToSync[]> =>
  getRequest("/events?done=false");
export const getEvents = (): Promise<EventDetail[]> => getRequest("/events");

export const getEventLive = (id: number): Promise<EventDetail> =>
  getRequest(`/events/${id}/live`);

export const getEventLiveOnlineLink = (): Promise<GetLinkEventLiveLink> =>
  getRequest(`/events/live/link`);

export const getLiveEventDetail = (id: number): Promise<EventLiveDetail> =>
  getRequest(`/events/${id}/live/detail`);

export const getEventsLive = (): Promise<EventDetail[]> => {
  return getRequest("/events?live=true");
};

export const updateEvent = (
  id: number,
  event: UpdateEvent
): Promise<UpdateEvent> => {
  return putRequest(`/events/${id}`, event);
};

export const completeEvent = (
  id: number,
  completeEventRequest: CompleteEventRequest
): Promise<UpdateEvent> => {
  return putRequest(`/events/${id}/done`, completeEventRequest);
};

export const getEvent = (id: number): Promise<EventDetail> =>
  getRequest(`/events/${id}`);

export const getEventToReportAttendance = (
  id: number
): Promise<EventToReportAttendance> => getRequest(`/events/${id}/attendance`);

export const getCheckAttendanceGeneral = (
  id: number
): Promise<EventToReportAttendance> =>
  getRequest(`/events/${id}/attendances/general`);

export const getSpeakersFromEvent = (id: number): Promise<SpeakerEvent[]> =>
  getRequest(`/events/${id}/speakers`);

export const reportAttendance = (
  token: string
): Promise<ReportAttendanceResponse> => {
  return putRequest(`/events/attendances/${token}`);
};

export const reportAttendanceGeneral = (
  token: string
): Promise<CheckAttendanceGeneralResponse> => {
  return putRequest(`/events/attendances/general/${token}`);
};

export const reportAttendanceGeneralByCode = (
  id: number,
  code: string
): Promise<CheckAttendanceGeneralResponse> => {
  return putRequest(`/events/${id}/attendances/general/${code}`);
};

export const createGroupCode = (
  eventId: number,
  detail: string
): Promise<CreateGroupCodeResponse> =>
  postRequest(`/events/${eventId}/groupCodes`, { detail: detail });

export const addCodeToGroupCode = (
  eventId: number,
  code: string
): Promise<AddMemberToGroupCodeResponse> => {
  return postRequest(`/events/${eventId}/groupcodes/${code}`);
};

export const addMemberToGroupCode = (
  groupCodeId: number,
  eventId: number,
  memberId: number
): Promise<boolean> => {
  return postRequest(
    `/events/${eventId}/groupcodes/${groupCodeId}/members/${memberId}`
  );
};

export const deleteMemberFromGroupCode = (
  groupCodeId: number,
  eventId: number,
  memberId: number
): Promise<boolean> => {
  return deleteRequest(
    `/events/${eventId}/groupcodes/${groupCodeId}/members/${memberId}`
  );
};
export interface ReportAttendanceResponse {
  eventId: number;
  memberId: number;
}
