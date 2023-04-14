import { Async } from "../../api";

export type Props = {
  menu: Async.Menu;
  orderAction: AppDispatchAction;
};

export enum TestId {
  menu = "customer-menu",
  order = "customer-order",
}
