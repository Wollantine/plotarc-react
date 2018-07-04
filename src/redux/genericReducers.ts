import { TReducer, TAction } from "./appReducer";

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
