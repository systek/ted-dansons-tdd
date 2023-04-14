type KeyOfFunctions<Object> = {
  [Key in keyof Object]: Object[Key] extends (...input: unknown[]) => unknown
    ? Key
    : never;
}[keyof Object];

// The subset of props to be mapped in `mapDispatchToProps`
export type DispatchProps<Props> = Pick<Props, KeyOfFunctions<Props>>;

// The subset of props to be mapped in `mapStateToProps`
export type StateProps<Props, OwnProps = {}> = Omit<
  Props,
  keyof DispatchProps<Props> | "children" | keyof OwnProps
>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface

type ReduxAction = import("redux").Action;

interface Action<T> extends ReduxAction {
  type: T;
}

export type ActionDataType<T, P> = Action<T> & Partial<P>;
