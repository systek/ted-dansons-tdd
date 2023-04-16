/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-render-in-setup */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { getAll } from "../../__mocks__/test.utils";
import PlaceOrder from "./PlaceOrder";
import { Props, TestId } from "./types";

describe("Customer Component", () => {
  let orderAction: jest.Mock;

  describe("before order is placed", () => {
    beforeEach(() => {
      orderAction = jest.fn();
      render(
        <PlaceOrder {...({ orderAction } as Pick<Props, "orderAction">)} />
      );
    });

    describe("form", () => {
      it("should be rendered", () =>
        expect(screen.getByTestId(TestId.order)).toBeInTheDocument());

      it("should be rendered with 2 input fields", () =>
        expect(getAll(screen.getByTestId(TestId.order), "input")).toHaveLength(
          2
        ));

      it("should be rendered submit button", () =>
        expect(getAll(screen.getByTestId(TestId.order), "button")).toHaveLength(
          1
        ));

      describe("on submit", () => {
        beforeEach(() => {
          let [beer, amount] = getAll(
            screen.getByTestId(TestId.order),
            "input"
          ) as HTMLInputElement[];
          beer.value = "ipa";
          amount.value = "2";
          fireEvent(
            getAll(screen.getByTestId(TestId.order), "button").at(0) as any,
            new MouseEvent("click", {
              bubbles: true,
              cancelable: true,
            })
          );
        });
        it("should call orderAction", () => {
          expect(orderAction).toBeCalledTimes(1);
          expect(orderAction).toHaveBeenCalledWith({
            placedOrder: { ipa: "2" },
            orderNr: 123,
          });
        });
      });
    });
  });
});
