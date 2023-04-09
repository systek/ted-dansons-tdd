import { createSelector } from "reselect";
import { selectFromRoot } from "../utils";
import { AppState } from "./types";

type RootState = any;

export const getAppState = (state: RootState): AppState =>
  selectFromRoot(state, "App");
export const getOrder = createSelector(
  getAppState,
  ({ order }: AppState) => order
);
export const getMenu = createSelector(
  getAppState,
  ({ menu }: AppState) => menu
);
