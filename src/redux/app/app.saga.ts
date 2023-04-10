/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AsyncData } from "@swan-io/boxed";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { MenuDTO, OrderDTO, api, paths, Params } from "../../api";
import { asyncError, asyncOk } from "../../api/domain/async.utils";

import { menu, moreBeer, order } from "./app.actions";
import { ActionTypes, Actions } from "./types";

const orderSerializer = (path: string, orderNr: number) =>
  path.replace(Params.ordernr, `${orderNr}`);

export function* initMenu() {
  yield put(menu({ menu: AsyncData.Loading() }));
  let menuDto: MenuDTO = yield call(api.get, paths.menu);

  if (!!menuDto) {
    yield put(menu({ menu: asyncOk(menuDto) }));
  } else {
    yield put(menu({ menu: asyncError("No menu" as unknown as MenuDTO) }));
  }
}

export function* onPayBill({ orderNr }: ActionTypes) {
  yield call(api.del, orderSerializer(paths.order.root, orderNr!));
  yield put(moreBeer());
}

export function* onOrderInit({ placedOrder, orderNr }: ActionTypes) {
  yield put(order({ order: AsyncData.Loading() }));
  try {
    const orderDto: OrderDTO = yield call(
      api.post,
      orderSerializer(paths.order.root, orderNr!),
      placedOrder
    );

    yield put(order({ order: asyncOk(orderDto) }));
  } catch (error) {
    yield put(order({ order: asyncError(error as unknown as OrderDTO) }));
  }
}

export function* AppSaga() {
  yield all([
    takeEvery(Actions.ORDER_INIT, onOrderInit),
    takeEvery(Actions.PAY_BILL, onPayBill),
  ]);
  yield call(initMenu);
}

export default AppSaga;
