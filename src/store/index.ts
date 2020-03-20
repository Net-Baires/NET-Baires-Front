import { combineReducers } from "redux";
import { loadingReducer } from "./loading/loadingReducer";
import { homeReducer } from "./loading/homeReducer";
import { memberDetailReducer } from "./loading/memberDetailReducer";

import { reducer } from "react-redux-oauth2";
const rootReducer = combineReducers({
  loading: loadingReducer,
  memberDetail: memberDetailReducer,
  oauth: reducer,
  home: homeReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
