import { LOADING, READY, LoadingState, LoadingActionTypes } from './types';
import { initialState } from './initialState';
export function loadingReducer(state = initialState, action: LoadingActionTypes): LoadingState {
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
