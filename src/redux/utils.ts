import { ActionDataType } from "./types";

export const selectFromRoot = <T, Key extends keyof T>(
  state: T,
  select: Key
): T[Key] =>
  state && select ? state[select] : (undefined as unknown as T[Key]);

export const toAction = <T, P>(
  type: T,
  data: Partial<P> = {}
): ActionDataType<T, P> => ({
  ...data,
  type,
});
