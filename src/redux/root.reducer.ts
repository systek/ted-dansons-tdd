import { combineReducers } from 'redux';
import { reducer as App, AppState } from './app';

export const rootReducer = combineReducers({
    App,
});

export type RootState = {
    App: AppState;
};
