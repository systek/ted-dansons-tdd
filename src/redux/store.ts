import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import createSagaMiddleware from "redux-saga";

import { ActionTypes as AppActionTypes } from "./app";
import { rootReducer } from "./root.reducer";
import { rootSaga } from "./root.saga";

const sagaMiddleware = createSagaMiddleware({
  context: {},
});

export const store: Store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

export type ActionTypes = AppActionTypes;

export const action = (type: ActionTypes): ActionTypes => store.dispatch(type);
