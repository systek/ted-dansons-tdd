/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { AsyncData } from "@swan-io/boxed";
import { screen, render as testRender } from "@testing-library/react";
import { DeepPartial } from "redux";
import {
  AppContainer,
  TestId,
  mapDispatchToProps,
  mapStateToProps,
} from "./App";
import { shape } from "./__mocks__/test.utils";
import MockUtil from "./gist/test.utils/jest.utils";
import { ActionTypes, Actions, initialState } from "./redux/app";
import * as appSelectors from "./redux/app/app.selectors";
import { RootState } from "./redux/root.reducer";
import { Props } from "./components/Customer";
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
      // mock selectors and assign values to property by calling containers property mapper
    });

    it("delegates work to selectors", () => {
      //  selector-mocks had been called with expected values
    });

    it("has assigned values", () => {
      // props assign with expected result
    });
  });
  describe("mapDispatchToProps", () => {
    let dispatch: jest.Mock;

    //check that  dispatch actions are connected
    describe.each([
      // dispatcher function
      [] as any,
    ] as Array<[keyof Props, ActionTypes]>)(
      "when action %s is called",
      (action, expected) => {
        beforeEach(() => {
          dispatch = jest.fn();
          // call the function
        });
        it(`should dispatch actionType ${shape(expected)}`, () => {
          // dispatch-mock should have been called with expected action
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

      it("dispatches order", () => {});
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
