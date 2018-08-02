import * as R from 'ramda';
import {Note, Category, isA, relatedTo} from '../model/Types';
import { TSearchFormState } from '../components/SearchForm/SearchFormState';

export type TSelector<T> = (state: IState) => T;

export interface IState {
    notes: R.Dictionary<Note>;
    categories: R.Dictionary<Category>;
    searchForm: TSearchFormState;
}

export const notesSelector: TSelector<R.Dictionary<Note>> = state => state.notes;
export const categoriesSelector: TSelector<R.Dictionary<Category>> = state => state.categories;
export const searchFormSelector: TSelector<TSearchFormState> = state => state.searchForm;

export const categories = {
    '600k1': {id: '600k1', title: 'book', notes: ['1a345', '1b345']},
    'ch4p73r2': {id: 'ch4p73r2', title: 'chapter', notes: ['1c345', '1d345']},
    '5c3n33': {id: '5c3n33', title: 'scene', notes: ['1e345', '1f345']},
    'ch4r4c73r4': {id: 'ch4r4c73r4', title: 'character', notes: ['1g345', '1h345']},
}

export const notes: R.Dictionary<Note> = {
    '1a345': {id: '1a345', title: 'Book One', isA: ['600k1'], relatedTo: ['1c345', '1d345']},
    '1b345': {id: '1b345', title: 'Book Two', isA: ['600k1'], relatedTo: []},
    '1c345': {id: '1c345', title: 'Chapter One', isA: ['ch4p73r2'], relatedTo: ['1a345', '1e345', '1f345']},
    '1d345': {id: '1d345', title: 'Chapter Two', isA: ['ch4p73r2'], relatedTo: ['1a345']},
    '1e345': {id: '1e345', title: 'Scene 1-1', isA: ['5c3n33'], relatedTo: ['1c345', '1a345', '1g345']},
    '1f345': {id: '1f345', title: 'Scene 1-2', isA: ['5c3n33'], relatedTo: ['1c345', '1a345', '1g345', '1h345']},
    '1g345': {id: '1g345', title: 'GoodGood', isA: ['ch4r4c73r4'], relatedTo: ['1e345', '1f345', '1c345', '1a345']},
    '1h345': {id: '1h345', title: 'GoodBad', isA: ['ch4r4c73r4'], relatedTo: ['1f345', '1c345', '1a345']},
}

export const initialState = {
    categories,
    notes,
}

const books = R.pipe(
    R.filter(isA('600k1')),
    R.values,
    R.map(R.prop('id')),
)(notes)

const groupBy = R.curry((groups: string[], notes: Note[]) => (
    groups.reduce((acc, curr) => ({
        ...acc,
        [curr]: notes.filter(relatedTo(curr))
    }), {})
))

export const scenesByBook = R.pipe(
    R.filter(isA('5c3n33')),
    R.values,
    groupBy(books),
)(notes)
