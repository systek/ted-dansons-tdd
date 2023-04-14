import { Async } from "../../api";
import { AppDispatchAction } from "../../redux/app/types";

export type Props = {
  menu: Async.Menu;
  orderAction: AppDispatchAction;
};
export enum TestId {
  menu = "customer-menu",
  order = "customer-order",
}
