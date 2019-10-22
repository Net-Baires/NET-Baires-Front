import { LOADING, READY, LoadingActionTypes } from "./types";

export function loading(): LoadingActionTypes {
  return {
    type: LOADING,
    payload: true
  };
}

export function ready(): LoadingActionTypes {
  return {
    type: READY,
    payload: false
  };
}
