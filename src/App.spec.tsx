/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-render-in-setup */

import { AsyncData } from "@swan-io/boxed";
import { screen, render as testRender } from "@testing-library/react";
import { DeepPartial } from "redux";
import {
  AppContainer,
  Props,
  TestId,
  mapDispatchToProps,
  mapStateToProps,
} from "./App";
import { shape } from "./__mocks__/test.utils";
import MockUtil from "./gist/test.utils/jest.utils";
import { ActionTypes, Actions, initialState } from "./redux/app";
import * as appSelectors from "./redux/app/app.selectors";
import { RootState } from "./redux/root.reducer";

jest.mock("./redux/app/app.selectors").mock("./components/Customer", () => ({
  __esModule: true,
  Customer: (props: any) => <div data-testid={props["data-testid"]}></div>,
}));

const mocks = MockUtil<typeof appSelectors>(jest).requireMock(
  "./redux/app/app.selectors"
);

describe("App Container", () => {
  afterEach(jest.restoreAllMocks);
  afterEach(jest.resetAllMocks);

  describe("mapStateToProps", () => {
    let state: RootState;

    beforeEach(
      () => (state = { ...{ App: { ...initialState } } } as RootState)
    );
    let props: Partial<Props>;
    beforeEach(() => {
      mocks.getOrder?.mockReturnValue("order_value");
      mocks.getMenu?.mockReturnValue("menu_value");
      props = mapStateToProps(state);
    });

    it("delegates work to selectors", () => {
      expect(mocks.getOrder).toHaveBeenCalledWith(state);
      expect(mocks.getMenu).toHaveBeenCalledWith(state);
    });

    it("has assigned values", () => {
      expect(Object.entries(props)).toEqual([
        ["order", "order_value"],
        ["menu", "menu_value"],
      ]);
    });
  });
  describe("mapDispatchToProps", () => {
    let dispatch: jest.Mock;

    it("has assigned values", () => {
      expect(Object.keys(mapDispatchToProps(jest.fn()))).toEqual([
        "orderAction",
        "moreBeer",
        "payBill",
      ]);
    });

    describe.each([
      ["moreBeer", { type: Actions.ORDER_MORE_BEER }],
      ["orderAction", { type: Actions.ORDER_INIT }],
      ["payBill", { type: Actions.PAY_BILL }],
    ] as Array<[keyof Props, ActionTypes]>)(
      "when action %s is called",
      (action, expected) => {
        beforeEach(() => {
          dispatch = jest.fn();
          (mapDispatchToProps(dispatch) as any)[action]();
        });
        it(`should dispatch actionType ${shape(expected)}`, () => {
          expect(dispatch).toHaveBeenCalledTimes(1);
          expect(dispatch).toBeCalledWith(expected);
        });
      }
    );

    describe("orderAction", () => {
      beforeEach(() => {
        dispatch = jest.fn();
        (mapDispatchToProps(dispatch) as any).orderAction({
          placedOrder: "placedOrder",
        });
      });

      it("dispatches order", () => {
        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toBeCalledWith({
          placedOrder: "placedOrder",
          type: Actions.ORDER_INIT,
        });
      });
    });
  });

  describe("AppContainer", () => {
    let props: DeepPartial<Props>;
    const setup = (extend: DeepPartial<Props> = {}) =>
      (props = {
        ...{ menu: AsyncData.NotAsked() },
        ...props,
        ...extend,
      } as Props);

    const render = () => testRender(<AppContainer {...(props as Props)} />);
    beforeEach(() => {
      setup();
      render();
    });

    it("should render Customer Component", () =>
      expect(screen.getByTestId(TestId.customer)).toBeInTheDocument());
  });
});
