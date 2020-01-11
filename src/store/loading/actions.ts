import { LOADING, READY, LoadingActionTypes, SET_MEMBER_DETAIL, memberDetailActionTypes } from "./types";
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

export function ready(): LoadingActionTypes {
  return {
    type: READY,
    payload: false
  };
}
