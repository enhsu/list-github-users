import { combineReducers } from "@reduxjs/toolkit";
import { asyncDataReducer } from "./asyncData/slice";

const rootReducer = combineReducers({
  asyncData: asyncDataReducer,
});

export default rootReducer;
