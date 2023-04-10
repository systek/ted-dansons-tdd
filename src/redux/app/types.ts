import { Async, PlacedOrder } from "../../api";
import { ActionDataType } from "../types";

export interface AppState {
  readonly menu: Async.Menu;
  readonly order: Async.Order;
}

export enum Actions {
  MENU = "APP_MENU",
  ORDER = "APP_ORDER",
  ORDER_INIT = "APP_ORDER_INIT",
  ORDER_MORE_BEER = "APP_ORDER_RESET",
  PAY_BILL = "APP_PAY_BILL",
}

export type ActionData = Mutable<AppState> & {
  placedOrder: PlacedOrder;
  orderNr: number;
};
export type ActionTypes = ActionDataType<Actions, ActionData>;
