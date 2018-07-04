import {all, fork} from 'redux-saga/effects';

export type TEffects = IterableIterator<any>;

export function* appSaga(): TEffects {
    yield all([
        //Insert your sagas
    ].map(fork));
}
