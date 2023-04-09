/* eslint-disable jest/no-mocks-import */
import { AsyncData } from "@swan-io/boxed";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import { call } from "redux-saga/effects";
import { OrderDTO, PlacedOrder, api, orderIdUrl, paths } from "../../api";

import { asyncError, asyncOk } from "../../api/domain/async.utils";
import { menu, moreBeer, order, orderInit } from "./app.actions";
import appReducer from "./app.reducer";
import AppSaga, { initMenu, onOrderInit, onPayBill } from "./app.saga";
import { menu as menuDto, order as orderDto } from "../../api/__mocks__";

const placedOrder: PlacedOrder = { porter: 1 };

describe("app saga", () => {
  describe(`onMenuInit`, () => {
    it("should fetch menu and put to state", () => {
      testSaga(initMenu)
        .next()
        .put(menu({ menu: AsyncData.Loading() }))
        .next()
        .call(api.get, paths.menu)
        .next(menuDto)
        .put(menu({ menu: asyncOk(menuDto) }))
        .next()
        .isDone();
    });
  });

  describe(`onOrderInit`, () => {
    describe("success", () => {
      it("should fetch menu and put to state", () => {
        testSaga(onOrderInit, orderInit({ placedOrder }))
          .next()
          .put(order({ order: AsyncData.Loading() }))
          .next()
          .call(api.post, orderIdUrl, placedOrder)
          .next(orderDto)
          .put(order({ order: asyncOk(orderDto) }))
          .next()
          .isDone();
      });
    });

    describe("fails", () => {
      const rejectionMessage = "We do not have ipa";
      it("should fetch menu and put to state", () => {
        testSaga(onOrderInit, orderInit({ placedOrder }))
          .next()
          .put(order({ order: AsyncData.Loading() }))
          .next()
          .call(api.post, orderIdUrl, placedOrder)
          .throw(rejectionMessage as any)
          .put(
            order({
              order: asyncError(rejectionMessage as unknown as OrderDTO),
            })
          )
          .next()
          .isDone();
      });
    });
  });

  describe(`onPayBill`, () => {
    it("should fetch receipt and reset state", () => {
      testSaga(onPayBill)
        .next()
        .call(api.del, orderIdUrl)
        .next()
        .put(moreBeer())
        .next()
        .isDone();
    });
  });

  describe("dispatch actions", () => {
    describe("onOrderInit", () => {
      it("should call api and update state", () =>
        expectSaga(AppSaga)
          .withReducer(appReducer)
          .dispatch(orderInit({ placedOrder }))
          .provide([[call(api.post, orderIdUrl, placedOrder), orderDto]])
          .hasFinalState({
            menu: asyncOk({}),
            order: asyncOk(orderDto),
          })
          .run({ silenceTimeout: true }));
    });
  });
});
