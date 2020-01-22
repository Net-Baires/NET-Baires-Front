import { combineReducers } from "redux";
import { loadingReducer, memberDetailReducer, homeReducer } from './loading/reducers';

import { reducer } from "react-redux-oauth2";
const rootReducer = combineReducers({
  loading: loadingReducer,
  memberDetail: memberDetailReducer,
  oauth: reducer,
  home: homeReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export default rootReducer;
