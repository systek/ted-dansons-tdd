/* eslint-disable jest/no-mocks-import */
/* eslint-disable testing-library/no-render-in-setup */
import { AsyncData } from "@swan-io/boxed";
import { render, screen } from "@testing-library/react";

import { mockData } from "../../api/__mocks__";
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
  describe.each([
    [AsyncData.NotAsked(), TestId.order],
    [AsyncData.Loading(), TestId.loading],
    [AsyncData.Done({}), TestId.served],
  ] as Array<[Props["order"], TestId]>)(
    "when order is %j",
    (order, visibleComponent) => {
      beforeEach(() => {
        render(
          <Customer
            {...{
              order,
              orderAction: jest.fn(),
              moreBeer: jest.fn(),
              payBill: jest.fn(),
              menu: mockData.menu.done,
            }}
          />
        );
      });

      it.each(
        Object.values(TestId).filter(
          (val) => val !== visibleComponent && val !== TestId.header
        )
      )("component %s should not be rendered", (id: TestId) =>
        expect(screen.queryByTestId(id)).toBeNull()
      );

      it.each(Object.values(TestId).filter((val) => val === visibleComponent))(
        "component %s should be rendered",
        (id: TestId) => expect(screen.getByTestId(id)).toBeInTheDocument()
      );
    }
  );
});
