/* eslint-disable jest/no-mocks-import */
import { AsyncData } from "@swan-io/boxed";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { OrderDTO, PlacedOrder, api } from "../../api";

import { menu as menuDto, order as orderDto } from "../../api/__mocks__";
import { asyncError, asyncOk } from "../../api/domain/async.utils";
import { menu, moreBeer, order, orderInit } from "./app.actions";
import appReducer from "./app.reducer";
import AppSaga, { initMenu, onOrderInit, onPayBill } from "./app.saga";
import { Actions } from "./types";

const placedOrder: PlacedOrder = { porter: 1 };

describe("app saga", () => {
  describe(`onMenuInit`, () => {
    it("should fetch menu and update state with response", () => {
      testSaga(initMenu)
        .next()
        .put(menu({ menu: AsyncData.Loading() }))
        .next()
        .call(api.get, "/menu")
        .next(menuDto)
        .put(menu({ menu: asyncOk(menuDto) }))
        .next()
        .isDone();
    });
  });

  describe(`onOrderInit`, () => {
    describe("success", () => {
      it("should post order, and update state with response", () => {
        testSaga(onOrderInit, orderInit({ placedOrder, orderNr: 123 }))
          .throw("error" as any)
          .isDone();
      });
    });

    describe("fails", () => {
      const rejectionMessage = "We do not have ipa";
      it("should post order, and update state with failing response (as error)", () => {
        testSaga(onOrderInit, orderInit({ placedOrder, orderNr: 123 }))
          .throw("error" as any)
          .isDone();
      });
    });
  });

  describe(`onPayBill`, () => {
    it("should fetch receipt and reset state", () => {
      testSaga(onPayBill, { orderNr: 456, type: Actions.PAY_BILL })
        .throw("error" as any)
        .isDone();
    });
  });

  describe("dispatch actions", () => {
    describe("onOrderInit", () => {
      it("should call api and update state", () =>
        expectSaga(AppSaga)
          .withReducer(appReducer)
          .dispatch(orderInit({ placedOrder, orderNr: 321 }))
          .provide([
            [call(api.post, "/order/321", placedOrder), orderDto],
            [call(api.get, "/menu"), menuDto],
          ])
          .hasFinalState({
            menu: asyncOk(menuDto),
            order: asyncOk(orderDto),
          })
          .run({ silenceTimeout: true }));
    });
  });
});
