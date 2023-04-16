/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { AsyncData } from "@swan-io/boxed";
import { render as testRender, screen } from "@testing-library/react";

import Customer from "./Customer";
import { Props, TestId } from "./types";
jest
  .mock("../Order", () => ({
    __esModule: true,
    Order: (props: any) => <div data-testid={props["data-testid"]}></div>,
  }))
  .mock("../Served", () => ({
    __esModule: true,
    Served: (props: any) => <div data-testid={props["data-testid"]}></div>,
  }));

describe("Customer Component", () => {
  let props: Partial<Props>;
  const setup = (extend: Partial<Props> = {}) =>
    (props = {
      ...{ order: AsyncData.NotAsked() },
      ...props,
      ...extend,
    } as Props);

  const render = () => testRender(<Customer {...(props as Props)} />);

  beforeEach(setup);

  it("should render header", () => {
    render();
    expect(screen.getByTestId(TestId.header)).toBeInTheDocument();
    expect(screen.getByTestId(TestId.header)?.textContent).toContain(
      "Welcome to Cheers"
    );
  });

  describe("before any order is placed", () => {
    beforeEach(() => {
      setup({ order: AsyncData.NotAsked() });
      render();
    });

    it("should render Order Component", () => expect(undefined).toBeDefined());
    it("should render no Loading Component", () =>
      expect(undefined).toBeDefined());
    it("should render no Served Component", () =>
      expect(undefined).toBeDefined());
  });

  describe("when order is placed", () => {
    beforeEach(() => {
      setup({ order: AsyncData.Loading() });
      render();
    });

    it("should render no Order Component", () =>
      expect(undefined).toBeDefined());
    it("should render Loading Component", () =>
      expect(undefined).toBeDefined());

    it("should render no Served Component", () =>
      expect(undefined).toBeDefined());
  });

  describe("when order is served", () => {
    beforeEach(() => {
      setup({ order: AsyncData.Done({}) } as any);
      render();
    });

    it("should render no Order Component", () =>
      expect(undefined).toBeDefined());
    it("should render Loading Component", () =>
      expect(undefined).toBeDefined());

    it("should render  Served Component", () =>
      expect(undefined).toBeDefined());
  });
});
