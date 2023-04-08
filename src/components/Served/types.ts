import { Result } from "../../api";

export type Props = {
  order: Result.Order;
  moreBeer: DispatchAction<void>;
  payBill: DispatchAction<void>;
};

export enum TestId {
  ok = "customer-ok",
  error = "customer-error",
}
