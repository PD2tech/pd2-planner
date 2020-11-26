import { combineReducers } from "@reduxjs/toolkit";
import currentUser from "./slices/currentUser";
import stats from "./slices/statsSlice";
import skills from "./slices/skillsSlice";
import equipment from "./slices/equipmentSlice";

export const rootReducer = combineReducers({
  currentUser,
  stats,
  skills,
  equipment,
});
