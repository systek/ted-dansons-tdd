import { Result } from "../../api";
import { AppDispatchAction } from "../../redux/app";

export type Props = {
  order: Result.Order;
  moreBeer: AppDispatchAction;
  payBill: AppDispatchAction;
};

export enum TestId {
  ok = "customer-ok",
  error = "customer-error",
}
