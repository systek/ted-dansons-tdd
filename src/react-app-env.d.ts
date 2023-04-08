/// <reference types="react-scripts" />
declare type Fn<H, T> = (..._: H) => T;
declare type DispatchAction<T> = Fn<[T], ActionTypes>;
