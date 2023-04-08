import { Async, OrderDTO } from "../../api";

export type Props = {
  menu: Async.Menu;
  orderAction: DispatchAction<OrderDTO>;
};
export enum TestId {
  menu = "customer-menu",
  order = "customer-order",
}
