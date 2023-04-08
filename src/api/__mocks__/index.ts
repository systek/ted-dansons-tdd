import { AsyncData, Result } from "@swan-io/boxed";
import { MenuDTO, OrderDTO } from "../domain";

export const order: OrderDTO = { lager: 1, ipa: 2, porter: 3, cost: 400 };
export const menu: MenuDTO = { lager: 50, ipa: 100, porter: 50 };
export const mockData = {
  order: {
    notAsked: AsyncData.NotAsked(),
    loading: AsyncData.Loading(),
    done: AsyncData.Done(Result.Ok<OrderDTO>(order)),
    fails: AsyncData.Done(
      Result.Error<OrderDTO>(
        "I think you had to many for tonight, sir" as never
      )
    ),
  },

  menu: {
    notAsked: AsyncData.NotAsked(),
    loading: AsyncData.Loading(),
    done: AsyncData.Done(Result.Ok<MenuDTO>(menu)),
    fails: AsyncData.Done(Result.Error<MenuDTO>("Menu fails" as never)),
  },
};
