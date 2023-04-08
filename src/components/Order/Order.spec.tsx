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
    beforeEach(() =>
      render(
        <Order
          {...{
            orderAction,
            menu: mockData.menu.loading,
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

  describe("after menu is loaded", () => {
    beforeEach(() =>
      render(
        <Order
          {...{
            orderAction,
            menu: mockData.menu.done,
          }}
        />
      )
    );

    it("should not show load message", () =>
      expect(
        screen.queryByText("Vent mens vi henter menyen")
      ).not.toBeInTheDocument());

    it("should render menu", () =>
      expect(screen.getAllByTestId(TestId.menu).at(0)).toBeInTheDocument());
    it("should render menu with 3 items", () =>
      expect(
        getAll(screen.getAllByTestId(TestId.menu).at(0)!, "li")
      ).toHaveLength(3));

    it("should render menu with 3 different items", () =>
      expect(
        getAll(screen.getAllByTestId(TestId.menu).at(0)!, "li").map(
          (li) => li.textContent
        )
      ).toEqual(["lager: 50,-", "ipa: 100,-", "porter: 50,-"]));

    it("should render order form", () =>
      expect(screen.getAllByTestId(TestId.order).at(0)).toBeInTheDocument());
  });

  describe("if menu is fails", () => {
    beforeEach(() =>
      render(
        <Order
          {...{
            orderAction,
            menu: mockData.menu.fails,
          }}
        />
      )
    );

    it("should not rendered menu", () =>
      expect(screen.queryByTestId(TestId.menu)).toBeNull());

    it("should not show load message", () =>
      expect(
        screen.queryByText("Vent mens vi henter menyen")
      ).not.toBeInTheDocument());
    it("should show error message", () =>
      expect(
        screen.getByText("Vi klarer ikke å laste menyen nå")
      ).toBeInTheDocument());
  });
});
