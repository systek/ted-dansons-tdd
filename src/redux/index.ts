/* eslint-disable no-duplicate-imports */
import { store, action } from './store';
import type { RootState } from './root.reducer';
import type { ActionTypes } from './store';

export { store, action };
export type { ActionTypes, RootState as ApplicationState };
