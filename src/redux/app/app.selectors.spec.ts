/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { getMenu, getOrder } from "./app.selectors";
import { AppState } from "./types";

describe.each([
  [{}, undefined],
  [{ order: undefined }, undefined],
  [{ order: {} }, {}],
] as Array<[AppState, any]>)("when AppState is %j", (App, expected) => {
  it(`getOrder should return ${JSON.stringify(expected)}}`, () =>
    expect(getOrder({ App })).toEqual(expected));
});

describe.each([
  [{}, undefined],
  [{ menu: undefined }, undefined],
  [{ menu: {} }, {}],
] as Array<[AppState, any]>)("when AppState is %j", (App, expected) => {
  it(`getMenu should return ${JSON.stringify(expected)}}`, () =>
    expect(getMenu({ App })).toEqual(expected));
});
