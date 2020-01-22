import { LOADING, READY, LoadingActionTypes, SET_MEMBER_DETAIL, memberDetailActionTypes, SET_EVENTS_LIVE, homeActionsTypes } from "./types";
import { Member } from '../../services/models/Member';

export function loading(): LoadingActionTypes {
  return {
    type: LOADING,
    payload: true
  };
}
export function setMemberDetail(member: Member): memberDetailActionTypes {
  return {
    type: SET_MEMBER_DETAIL,
    payload: member
  };
}
export function setEventsLive(eventsLive: boolean): homeActionsTypes {
  return {
    type: SET_EVENTS_LIVE,
    payload: eventsLive
  };
}

export function ready(): LoadingActionTypes {
  return {
    type: READY,
    payload: false
  };
}
