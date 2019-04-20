import { TAction } from './appReducer'
import * as R from 'ramda'

export type TReducer<T> = (state: T | undefined, action: TAction) => T;

export const actionHasField = (fieldName: string) => (action: TAction) => action.fieldName === fieldName;

export const actionIs = (type: string) => (action: TAction) => action.type === type;

export const reduceWhen = <T>(
    condition: (action: TAction) => boolean,
    reducer: TReducer<T>,
    initialState: T,
): TReducer<T> => (state: T = initialState, action: TAction): T => {
    return condition(action)
        ? reducer(state, action)
        : state
};

export const conditionalReducer = <T>(
    condition: (state: T | undefined, action: TAction) => boolean,
    thenReducer: TReducer<T>,
    elseReducer: TReducer<T>
): TReducer<T> => (
    (state, action) => (
        condition(state, action)
            ? thenReducer(state, action)
            : elseReducer(state, action)
    )
)

export const reducer = <T>(state: T, action: TAction, cases: R.Dictionary<() => T>): T => {
    const defaultCase = () => state
    const matchedCase: () => T = R.propOr(defaultCase, action.type, cases)
    return matchedCase()
};

const isFunction = (fn: any): fn is Function => typeof fn === 'function'

export const reducerHush = <T>(reducer: (state: T, action: TAction) => R.Dictionary<(state?: T, action?: TAction) => T>, initialState: T | (() => T)): TReducer<T> => {
    return (state, action) => {
        const initializedState = (state === undefined)
            ? isFunction(initialState) ? initialState() : initialState
            : state
        const defaultCase = () => initializedState;
        const matchedCase: (state?: T, action?: TAction) => T = R.propOr(defaultCase, action.type, reducer(initializedState, action))
        return matchedCase(state, action)
    }
}
