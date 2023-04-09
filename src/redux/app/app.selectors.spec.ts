/* eslint-disable jest/no-mocks-import */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { mockData } from "../../api/__mocks__";
import { getMenu, getOrder } from "./app.selectors";
import { AppState } from "./types";
describe.each([
  [{}, undefined],
  [{ order: undefined }, undefined],
  [{ order: {} }, {}],
  [{ order: mockData.order.done }, mockData.order.done],
] as Array<[AppState, any]>)("when AppState is %j", (App, expected) => {
  it(`getOrder should return ${JSON.stringify(expected)}}`, () =>
    expect(getOrder({ App })).toEqual(expected));
});

describe.each([
  [{}, undefined],
  [{ menu: undefined }, undefined],
  [{ menu: {} }, {}],
  [{ menu: mockData.menu.done }, mockData.menu.done],
] as Array<[AppState, any]>)("when AppState is %j", (App, expected) => {
  it(`getMenu should return ${JSON.stringify(expected)}}`, () =>
    expect(getMenu({ App })).toEqual(expected));
});
