import { AsyncData } from "@swan-io/boxed";
import {
  passReducer,
  reducerForProducers,
  writeToDraft,
  writeValuesToDraft,
} from "../../gist/immer.utils/immer.utils";

import { ActionTypes, Actions, AppState } from "./types";
const { ORDER, ORDER_INIT, MENU, ORDER_MORE_BEER, PAY_BILL } = Actions;

export const initialState: AppState = {
  menu: AsyncData.NotAsked(),
  order: AsyncData.NotAsked(),
};

const appReducer = reducerForProducers<AppState, ActionTypes, Actions>(
  initialState,
  {
    [ORDER_INIT]: passReducer,
    [MENU]: writeToDraft("menu"),
    [ORDER]: writeToDraft("order"),
    [ORDER_MORE_BEER]: writeValuesToDraft({ order: AsyncData.NotAsked() }),
    [PAY_BILL]: writeValuesToDraft({ order: AsyncData.NotAsked() }),
  }
);

export default appReducer;
