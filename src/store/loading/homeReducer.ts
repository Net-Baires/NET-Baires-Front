import { LoadingState, homeActionsTypes, SET_EVENTS_LIVE, SET_ONLINE_EVENT } from './types';
import { initialState } from './initialState';
export function homeReducer(state = initialState, action: homeActionsTypes): LoadingState {
    switch (action.type) {
        case SET_EVENTS_LIVE:
            return {
                ...state,
                eventsLive: action.payload
            };
        case SET_ONLINE_EVENT:
            return {
                ...state,
                onlineEvent: action.payload
            };
        default:
            return state;
    }
}
