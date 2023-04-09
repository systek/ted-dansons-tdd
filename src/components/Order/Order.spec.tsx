/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-node-access */
/* eslint-disable testing-library/no-render-in-setup */
import Order from "./Order";

import { render, screen } from "@testing-library/react";
import { mockData } from "../../api/__mocks__";
import { TestId } from "./types";
import { getAll } from "../../__mocks__/test.utils";

const orderAction = jest.fn();
afterEach(jest.restoreAllMocks);
afterEach(jest.resetAllMocks);

describe("Order Component", () => {
  describe("before menu is loaded", () => {
    beforeEach(() =>
      render(
        <Order
          {...{
            orderAction,
            menu: mockData.menu.notAsked,
          }}
        />
      )
    );

    it("should not rendered menu", () =>
      expect(screen.queryByTestId(TestId.menu)).toBeNull());

    it("should show load message", () =>
      expect(
        screen.getByText("Vent mens vi henter menyen")
      ).toBeInTheDocument());
  });

  describe("when menu is loading", () => {
    // beforeEach(() => ...); // render Order-component with menu loading

    it("should not rendered menu", () => expect(undefined).toBeDefined());

    it("should show load message", () => expect(undefined).toBeDefined());
  });

  describe("after menu is loaded", () => {
    // beforeEach(() => ...); render Order-component with menu loaded successfully

    it("should not show load message", () => expect(undefined).toBeDefined());

    it("should render menu", () => expect(undefined).toBeDefined());
    it("should render menu with 3 items", () =>
      expect(
        getAll(screen.getAllByTestId(TestId.menu).at(0)!, "li")
      ).toHaveLength(0));

    it("should render menu with 3 different items", () =>
      expect(undefined).toEqual(["lager: 50,-", "ipa: 100,-", "porter: 50,-"]));

    it("should render order form", () => expect(undefined).toBeDefined());
  });

  describe("if menu is fails", () => {
    // beforeEach(() =>... ); render Order-component with menu loaded erroneous

    it("should not rendered menu", () => expect(undefined).toBeDefined());

    it("should not show load message", () => expect(undefined).toBeDefined());
    it("should show error message", () =>
      expect(
        screen.getByText("Vi klarer ikke å laste menyen nå")
      ).toBeInTheDocument());
  });
});
