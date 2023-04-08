/* eslint-disable @typescript-eslint/no-namespace */
import { AsyncData, Result as BoxedResult } from "@swan-io/boxed";
import { MenuDTO, OrderDTO } from "./order";
export type Error = unknown;
export declare namespace Result {
  type Order = BoxedResult<OrderDTO, Error>;
  type Menu = BoxedResult<MenuDTO, Error>;
}

export declare namespace Async {
  type Order = AsyncData<Result.Order>;
  type Menu = AsyncData<Result.Menu>;
}
