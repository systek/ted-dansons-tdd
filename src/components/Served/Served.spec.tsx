/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-render-in-setup */
import { Result } from "@swan-io/boxed";
import { screen, render as testRender } from "@testing-library/react";

import { order } from "../../api/__mocks__";
import Served, { render } from "./Served";
import { Props, TestId } from "./types";
describe("Served Component", () => {
  let props: Partial<Props>;
  const setup = (extend: Partial<Props> = {}) =>
    (props = {
      ...props,
      ...extend,
    } as Props);

  const render = () => testRender(<Served {...(props as Props)} />);

  beforeEach(setup);
  afterEach(jest.restoreAllMocks);
  afterEach(jest.resetAllMocks);

  describe("when order is ok", () => {
    beforeEach(() => {
      setup({ order: Result.Ok(order) });
      render();
    });

    it("should render served order", () => {
      expect(screen.getByTestId(TestId.ok)).toBeInTheDocument();
      expect(screen.getByTestId(TestId.ok)?.textContent).toContain(
        "Here's your 2 ipa, 1 lager & 3 porter, sir"
      );
    });
    it("should render no error message", () =>
      expect(screen.queryByTestId(TestId.error)).toBeNull());
  });

  describe("when order fails", () => {
    beforeEach(() => {
      setup({
        order: Result.Error("I think you had to many for tonight, sir") as any,
      });
      render();
    });

    it("should render served order", () =>
      expect(screen.queryByTestId(TestId.ok)).toBeNull());

    it("should render no error message", () => {
      expect(screen.getByTestId(TestId.error)).toBeInTheDocument();
      expect(screen.getByTestId(TestId.error)?.textContent).toContain(
        "I think you had to many for tonight, sir"
      );
    });
  });
});

describe("render template", () => {
  describe.each([
    ["", undefined as any, ""],
    ["", {}, ""],
    ["", { animal: "Fox" }, ""],
    ["{{animal}}", { animal: "Fox" }, "Fox"],
    [
      "The {{ animal }} jumps over the {{ object }}",
      { animal: "Fox", object: "Brook" },
      "The Fox jumps over the Brook",
    ],
    [
      "The {{ animal }} jumps over the {{ object }}",
      { animal: "Hare", object: "Fox" },
      "The Hare jumps over the Fox",
    ],
  ] as Array<[string, Record<string, string | number>, string]>)(
    "object %p",
    (template, data, expected) => {
      it(`should be rendered as "${expected}" into template "${template}"`, () => {
        expect(render(template, data)).toEqual(expected);
      });
    }
  );
});
