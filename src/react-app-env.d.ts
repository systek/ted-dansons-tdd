/// <reference types="react-scripts" />
declare type Fn<H, T> = (..._: H) => T;

declare type Mutable<Type> = {
  -readonly [Key in keyof Type]: Type[Key];
};
