
export interface IState {
}

export type TSelector<T> = (state: IState) => T;
