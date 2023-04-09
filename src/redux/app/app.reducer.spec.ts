/* eslint-disable jest/no-mocks-import */
import { AsyncData } from "@swan-io/boxed";
import { shape } from "../../__mocks__/test.utils";
import * as appActions from "./app.actions";
import appReducer from "./app.reducer";
import { ActionData, Actions, AppState } from "./types";
describe("app.reducer", () => {
  describe(`on action ${Actions.ORDER_INIT}`, () => {
    describe.each([
      [{}, undefined],
      [{}, {}],
      [{}, { order: "order" }],
      [
        { menu: "menu", order: "order" },
        { menu: "new menu", order: "new order" },
      ],
    ] as Array<[AppState, Partial<ActionData>]>)(
      "with initialState %j \n\t when action is dispatched with values %p",
      (currentState, data) => {
        it("should pass through reducer", () =>
          expect(appReducer(currentState, appActions.orderInit(data))).toEqual(
            currentState
          ));
      }
    );
  });

  describe(`on action ${Actions.ORDER}`, () => {
    it("description", () => expect(true).toBeFalsy());
    // implementer tester for ulike verdier av init-state og ulike input parameter for å se hvordan state endres
  });

  describe(`on action ${Actions.MENU}`, () => {
    describe.each([
      [{}, undefined, {}],
      [{}, {}, {}],
      [{}, { menu: "menu" }, { menu: "menu" }],
      [{}, { order: "order" }, {}],
      [
        { menu: "menu", order: "order" },
        { menu: "new menu", order: "new order" },
        { menu: "new menu", order: "order" },
      ],
    ] as Array<[AppState, Partial<ActionData>, AppState]>)(
      "with initialState %j \n\t when action is dispatched with values %p",
      (currentState, data, expected) => {
        it(`should change state to ${shape(expected)}`, () =>
          expect(appReducer(currentState, appActions.menu(data))).toEqual(
            expected
          ));
      }
    );
  });

  describe(`on action ${Actions.ORDER_MORE_BEER}`, () => {
    describe.each([
      [{}, undefined, { order: AsyncData.NotAsked() }],
      [{}, {}, { order: AsyncData.NotAsked() }],
      [
        { order: undefined },
        { order: AsyncData.Loading() },
        { order: AsyncData.NotAsked() },
      ],
      [{ menu: "menu" }, {}, { order: AsyncData.NotAsked(), menu: "menu" }],
    ] as Array<[AppState, Partial<ActionData>, AppState]>)(
      "with initialState %j \n\t when action is dispatched with values %p",
      (currentState, data, expected) => {
        it(`should change state to ${shape(expected)}`, () =>
          expect(appReducer(currentState, appActions.moreBeer(data))).toEqual(
            expected
          ));
      }
    );
  });

  describe(`on action ${Actions.PAY_BILL}`, () => {
    it("description", () => expect(true).toBeFalsy());
    // implementer tester for ulike verdier av init-state og ulike input parameter for å se hvordan state endres
  });
});
