import { AsyncData, Result } from "@swan-io/boxed";
import { Async } from "./async";

export const asyncOk = <T>(val: T) => AsyncData.Done(Result.Ok(val));
export const asyncError = <T>(val: T) =>
  AsyncData.Done(Result.Error(val)) as Async.Type<T>;
