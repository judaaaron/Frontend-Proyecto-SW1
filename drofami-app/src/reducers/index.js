import tokenReducer from "./getToken";

import { combineReducers } from "redux";

const allReducers = combineReducers({
  getToken: tokenReducer,
});
export default allReducers;