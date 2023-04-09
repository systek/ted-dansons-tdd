// eslint-disable-next-line @typescript-eslint/no-empty-interface

type ReduxAction = import('redux').Action;

interface Action<T> extends ReduxAction {
    type: T;
}

export type ActionTypes<T, P> = Action<T> & Partial<P>;
