import { createSelector } from "reselect";
import { selectFromRoot } from "../utils";
import { AppState } from "./types";

type RootState = any;

export const getAppState = (state: RootState): AppState =>
  selectFromRoot(state, "App");
