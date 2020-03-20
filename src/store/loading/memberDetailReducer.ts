import { LoadingState, memberDetailActionTypes, SET_MEMBER_DETAIL } from './types';
import { initialState } from './initialState';
export function memberDetailReducer(state = initialState, action: memberDetailActionTypes): LoadingState {
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
