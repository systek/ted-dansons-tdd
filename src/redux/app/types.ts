import { Async, PlacedOrder } from "../../api";

import { ActionTypes } from "../types";

export interface AppState {
  readonly menu: Async.Menu;
  readonly order: Async.Order;
}

export enum AppActions {
  MENU = "APP_MENU",
  ORDER = "APP_ORDER",
  ORDER_INIT = "APP_ORDER_INIT",
  ORDER_MORE_BEER = "APP_ORDER_RESET",
  PAY_BILL = "APP_PAY_BILL",
}

export interface AppActionData {
  menu: Async.Menu;
  order: Async.Order;
  placedOrder: PlacedOrder;
}

export type AppActionTypes = ActionTypes<AppActions, AppActionData>;
