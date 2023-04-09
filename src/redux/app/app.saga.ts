/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { AsyncData } from "@swan-io/boxed";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { MenuDTO, OrderDTO, api, paths, orderIdUrl } from "../../api";
import { asyncError, asyncOk } from "../../api/domain/async.utils";

import { menu, moreBeer, order } from "./app.actions";
import { ActionTypes, Actions } from "./types";

export function* initMenu() {
  yield put(menu({ menu: AsyncData.Loading() }));
  let menuDto: MenuDTO = yield call(api.get, paths.menu);

  if (!!menuDto) {
    yield put(menu({ menu: asyncOk(menuDto) }));
  } else {
    yield put(menu({ menu: asyncError("No menu" as unknown as MenuDTO) }));
  }
}

export function* onPayBill() {}

export function* onOrderInit({ placedOrder }: ActionTypes) {
  // use mocked orderIdUrl to post the order
}

export function* AppSaga() {
  yield all([
    takeEvery(Actions.ORDER_INIT, onOrderInit),
    takeEvery(Actions.PAY_BILL, onPayBill),
  ]);
  yield call(initMenu);
}

export default AppSaga;
