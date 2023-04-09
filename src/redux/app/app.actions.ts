import { toAction } from "../utils";
import { ActionData, Actions } from "./types";

const toAppAction =
  (type: Actions) =>
  (data: Partial<ActionData> = {}) =>
    toAction<Actions, Partial<ActionData>>(type, data);

export const menu = toAppAction(Actions.MENU);
export const orderInit = toAppAction(Actions.ORDER_INIT);
export const moreBeer = toAppAction(Actions.ORDER_MORE_BEER);
export const payBill = toAppAction(Actions.PAY_BILL);
export const order = toAppAction(Actions.ORDER);
