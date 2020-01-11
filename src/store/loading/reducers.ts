import { LOADING, READY, LoadingState, LoadingActionTypes, memberDetailActionTypes, SET_MEMBER_DETAIL } from './types';
import { Member } from '../../services/models/Member';

const initialState: LoadingState = {
  isLoading: false,
  memberDetail: {} as Member
};

export function loadingReducer(
  state = initialState,
  action: LoadingActionTypes
): LoadingState {
  switch (action.type) {
    case READY:
      return {
        ...state,
        isLoading: false
      };
    case LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
export function memberDetailReducer(
  state = initialState,
  action: memberDetailActionTypes
): LoadingState {

  switch (action.type) {

    case SET_MEMBER_DETAIL:
      return {
        ...state,
        memberDetail: action.payload
      };
    default:
      return state;
  }
}
