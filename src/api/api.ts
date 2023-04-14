/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { MenuDTO, OrderDTO, PlacedOrder } from "./domain";
import { paths } from "./paths";
import * as storage from "./storage";
type RequestResponse<T> = T;

export const orderTemplate: OrderDTO = {
  lager: 0,
  ipa: 0,
  porter: 0,
  cost: 0,
};

export const menu: MenuDTO = {
  lager: 70,
  ipa: 90,
  porter: 120,
};

export const del = async (url: string): Promise<RequestResponse<void>> =>
  storage.remove(url);

export const get = async <T>(url: string): Promise<RequestResponse<T>> =>
  url === paths.menu ? Promise.resolve(menu as T) : storage.get(url);

const sum = (...values: (number | string)[]) =>
  values
    .filter(Boolean)
    .map((i) => parseInt(i as any, 10))
    .reduce((curr, self) => curr + self, 0);

export const post = async <T>(
  url: string,
  body?: unknown
): Promise<RequestResponse<T>> =>
  /order\/\d+$/.test(url)
    ? (placeOrder(url, body as PlacedOrder) as Promise<T>)
    : Promise.resolve(body as T);
const unavailable = (body: PlacedOrder) =>
  ["stout", "guinness", "pils", "brigg", "halvliter"].filter((i) =>
    JSON.stringify(body).includes(i)
  );

const badRequest = (body: PlacedOrder = {}) =>
  (Object.keys(orderTemplate).filter((i) => JSON.stringify(body).includes(i))
    .length !== 1 &&
    JSON.stringify(body) !== "{}") ||
  Object.values(body).some((e) => isNaN(e) || e < 0);

const placeOrder = (url: string, body: PlacedOrder = {} as PlacedOrder) => {
  if (unavailable(body).length) {
    return Promise.reject(
      `Sorry mate, we do not have ${unavailable(body).join(" or ")}`
    );
  }
  if (badRequest(body)) {
    return Promise.reject(
      `I think we might had just enough for one night, sir`
    );
  }
  return storage.get(url, {} as PlacedOrder).then(
    (storedOrder: PlacedOrder) =>
      new Promise((res) => {
        let next = Object.keys(menu).reduce(
          (curr, key) => ({
            ...curr,
            // @ts-ignore
            [key]: sum(storedOrder[key], body[key], curr[key]),
            // @ts-ignore
            cost: curr.cost + menu[key] * sum(storedOrder[key], body[key]),
          }),
          orderTemplate
        );
        const currentOrder = { ...orderTemplate, ...body, cost: next.cost };
        setTimeout(() => {
          storage.set(url, next).then(() => res(currentOrder));
        }, 3000);
      })
  );
};
