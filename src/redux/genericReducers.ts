import { TReducer, TAction } from "./appReducer";
import * as R from 'ramda';

export const actionHasField = (fieldName: string) => (action: TAction) => action.fieldName === fieldName;

export const actionIs = (type: string) => (action: TAction) => action.type === type;

export const reduceWhen = <T>(
    condition: (action: TAction) => boolean,
    reducer: TReducer<T>,
    initialState: T,
): TReducer<T> => (state: T = initialState, action: TAction): T => {
    return condition(action)
        ? reducer(state, action)
        : state;
};

export const reducer = <T>(state: T, action: TAction, cases: R.Dictionary<() => T>): T => {
    const defaultCase = () => state;
    const matchedCase: () => T = R.propOr(defaultCase, action.type, cases);
    return matchedCase();
};

const NO_DEFAULT_CASE_ERROR = 'reducerHush passed in function must return an object with a `default` field';

export const reducerHush = <T>(reducer: (state: T, action: TAction) => R.Dictionary<() => T>, initialState: T): TReducer<T> => {
    return (state, action) => {
        const initializedState = (state === undefined) ? initialState : state;
        const defaultCase = () => initializedState;
        const matchedCase: () => T = R.propOr(defaultCase, action.type, reducer(initializedState, action));
        return matchedCase();
    }
}
