import { Member } from '../../services/models/Member';
export const LOADING = "LOADING";
export const READY = "READY";
export const SET_MEMBER_DETAIL = "SET_MEMBER_DETAIL";
export const SET_EVENTS_LIVE = "SET_EVENTS_LIVE";
export const SET_ONLINE_EVENT = "SET_ONLINE_EVENT";

interface LoadingAction {
  type: typeof LOADING;
  payload: boolean;
}

interface ReadyAction {
  type: typeof READY;
  payload: boolean;
}
interface SetMemberDetailAction {
  type: typeof SET_MEMBER_DETAIL;
  payload: Member;
}

interface SetEventsLive {
  type: typeof SET_EVENTS_LIVE;
  payload: boolean;
}

interface SetOnlineEvent {
  type: typeof SET_ONLINE_EVENT;
  payload: boolean;
}

export type LoadingActionTypes = LoadingAction | ReadyAction;
export type memberDetailActionTypes = SetMemberDetailAction;
export type homeActionsTypes = SetEventsLive | SetOnlineEvent;
export interface LoadingState {
  isLoading: boolean;
  memberDetail: Member;
  eventsLive: boolean;
  onlineEvent: boolean;
}
