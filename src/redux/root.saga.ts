/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { all } from 'redux-saga/effects';
import appSaga from './app/app.saga';

export function* rootSaga() {
    yield all([appSaga()]);
}

export default rootSaga;
