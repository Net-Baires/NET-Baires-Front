export const LOADING = "LOADING";
export const READY = "READY";

interface LoadingAction {
  type: typeof LOADING;
  payload: boolean;
}

interface ReadyAction {
  type: typeof READY;
  payload: boolean;
}

export type LoadingActionTypes = LoadingAction | ReadyAction;

export interface LoadingState {
  isLoading: boolean;
}
