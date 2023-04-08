import { Async } from "../../api";
import { Props as OrderProps } from "../Order";
import { Props as ServedProps } from "../Served";
export type Props = {
  order: Async.Order;
} & Pick<OrderProps, "menu" | "orderAction"> &
  Pick<ServedProps, "moreBeer" | "payBill">;

export enum TestId {
  order = "customer-order",
  header = "customer-header",
  loading = "customer-loading",
  served = "customer-served",
}
