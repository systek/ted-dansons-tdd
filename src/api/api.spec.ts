/* eslint-disable jest/no-mocks-import */
import { get, menu, orderTemplate, post } from "./api";
import { paths } from "./paths";
import * as storage from "./storage";
import MockUtil from "../gist/test.utils/jest.utils";
import { shape } from "../__mocks__/test.utils";
import { OrderDTO, PlacedOrder } from "./domain";

jest.mock("./storage");
const mocks = MockUtil<typeof storage>(jest).requireMocks("./storage");

describe("api", () => {
  describe("get", () => {
    describe.each([
      ["/", undefined],
      [paths.menu, menu],
    ] as Array<[string, any]>)('get("%s")', (url, expected) => {
      let response: any;
      beforeEach(async () => (response = await get(url)));
      it(`should respond with ${shape(expected)}`, () =>
        expect(response).toEqual(expected));
    });
  });

  describe("post", () => {
    describe.each([
      ["/", undefined, undefined],
      ["/", {}, {}],
      ["/what/else", {}, {}],
    ] as Array<[string, any, any]>)('post("%s", %j)', (url, body, expected) => {
      let response: any;
      beforeEach(async () => (response = await post(url, body)));
      it(`should respond with ${shape(expected)}`, () =>
        expect(response).toEqual(expected));
    });

    describe.each([
      [undefined, undefined, orderTemplate],
      [{}, {}, orderTemplate],
      [{ ipa: 1 }, {}, { ...orderTemplate, cost: 90 }],
      [{}, { ipa: 1 }, { ...orderTemplate, ipa: 1, cost: 90 }],
      [{ ipa: 1 }, { ipa: 1 }, { ...orderTemplate, ipa: 1, cost: 180 }],
    ] as Array<[PlacedOrder, PlacedOrder, OrderDTO]>)(
      "when stored order is %j\n\tand placed order is %j",
      (storedOrder, placedOrder, expected) => {
        let response: any;
        afterEach(jest.resetAllMocks);
        beforeEach(jest.useFakeTimers);
        beforeEach(() => {
          mocks.set?.mockImplementationOnce((e) => Promise.resolve(e));
          mocks.get?.mockResolvedValue(storedOrder || {});
          post("/order/123", placedOrder)
            .then((e) => (response = e))
            .catch((e) => console.log("catch", e));
        });

        beforeEach(jest.runAllTimers);
        it(`should respond with ${shape(expected)}`, () =>
          expect(response).toEqual(expected));
      }
    );

    describe.each([
      [{}, {}, orderTemplate],
      [{ ipa: 1 }, {}, { ...orderTemplate, ipa: 1, cost: 90 }],
      [{}, { ipa: 1 }, { ...orderTemplate, ipa: 1, cost: 90 }],
      [{ ipa: 1 }, { ipa: 1 }, { ...orderTemplate, ipa: 2, cost: 180 }],
    ] as Array<[PlacedOrder, PlacedOrder, OrderDTO]>)(
      "when stored order is %j\n\tand placed order is %j",
      (storedOrder, placedOrder, expected) => {
        afterEach(jest.resetAllMocks);
        beforeEach(jest.useFakeTimers);
        beforeEach(() => {
          mocks.set?.mockImplementationOnce((e) => Promise.resolve(e));
          mocks.get?.mockResolvedValue(storedOrder);
          post("/order/123", placedOrder);
        });

        beforeEach(jest.runAllTimers);
        it(`should store total order ${shape(expected)}`, () => {
          expect(mocks.set).toHaveBeenCalledTimes(1);
          expect(mocks.set).toHaveBeenCalledWith("/order/123", expected);
        });
      }
    );

    describe.each([
      [{ stout: 1 }, "Sorry mate, we do not have stout"],
      [
        { lager: 1, stout: 2, halvliter: 3 },
        "Sorry mate, we do not have stout or halvliter",
      ],
      [{ gorillas: 3 }, "I think we might had just enough for one night, sir"],
      [{ ipa: -1 }, "I think we might had just enough for one night, sir"],
      [{ ipa: "tree" }, "I think we might had just enough for one night, sir"],
    ] as Array<[any, any]>)(
      "when stored order is %j\n\tand placed order is %j",
      (placedOrder, expected) => {
        let response: any;
        afterEach(jest.resetAllMocks);
        beforeEach(jest.useFakeTimers);
        beforeEach(() => {
          mocks.set?.mockImplementationOnce((e) => Promise.resolve(e));
          mocks.get?.mockResolvedValue({});
          post("/order/123", placedOrder).catch((e) => (response = e));
        });

        beforeEach(jest.runAllTimers);
        it(`should reject order with message ${shape(expected)}`, () =>
          expect(response).toEqual(expected));
      }
    );
  });
});
