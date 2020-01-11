import { Member } from '../../services/models/Member';
export const LOADING = "LOADING";
export const READY = "READY";
export const SET_MEMBER_DETAIL = "SET_MEMBER_DETAIL";

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

export type LoadingActionTypes = LoadingAction | ReadyAction;
export type memberDetailActionTypes = SetMemberDetailAction;
export interface LoadingState {
  isLoading: boolean;
  memberDetail: Member;
}
