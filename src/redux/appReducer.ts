import {combineReducers} from 'redux';
import * as AppState from './appState';
import {searchForm} from '../components/SearchForm/SearchFormReducer';
import {emptyList} from '../components/ListDisplay/EmptyList/EmptyListReducer';
import { reducerHush } from './genericReducers';
import { EDIT_NOTE_TITLE } from '../components/Note/NoteActions';
import { noteReducer } from '../components/Note/NoteReducers';

export type TAction = {
    [key: string]: any;
    type: string;
};

const notes = reducerHush((state, action) => ({
    [EDIT_NOTE_TITLE]: () => ({
        ...state,
        [action.noteId]: noteReducer(state[action.noteId], action),
    }),
}), AppState.notes);
const categories = (state = AppState.categories) => state;

export const appReducer = combineReducers({
    notes,
    categories,
    searchForm,
    emptyList,
});
