import {combineReducers} from 'redux';
import * as AppState from './appState';
import {searchForm} from '../components/SearchForm/SearchFormReducer';
import {emptyList} from '../components/ListDisplay/EmptyList/EmptyListReducer';

export type TAction = {
    [key: string]: any;
    type: string;
};

export type TReducer<T> = (state: T | undefined, action: TAction) => T;

const notes = (state = AppState.notes, action) => state;
const categories = (state = AppState.categories) => state;

export const appReducer = combineReducers({
    notes,
    categories,
    searchForm,
    emptyList,
});
