import { LOADING, READY, LoadingState, LoadingActionTypes } from "./types";

const initialState: LoadingState = {
  isLoading: false
};

export function loadingReducer(
  state = initialState,
  action: LoadingActionTypes
): LoadingState {
  switch (action.type) {
    case READY:
      return {
        isLoading: false
      };
    case LOADING:
      return {
        isLoading: true
      };
    default:
      return state;
  }
}
