import { combineReducers } from "redux";
import { loadingReducer, memberDetailReducer } from "./loading/reducers";

import { reducer } from "react-redux-oauth2";
const rootReducer = combineReducers({
  loading: loadingReducer,
  memberDetail: memberDetailReducer,
  oauth: reducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
