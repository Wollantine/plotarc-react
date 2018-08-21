import * as R from 'ramda';
import { Note } from 'model/Note';
import { Category } from 'model/Category';
import { TSearchFormState } from '../components/SearchForm/SearchFormState';
import { Maybe } from 'tsmonad';
import { TEmptyListState } from 'components/ListDisplay/EmptyList/EmptyListState';
import { hasCategory, isRelatedTo } from 'queryEngine/filtering';

export type TSelector<T> = (state: IState) => T;

export type TestableSelector<T> = TSelector<T> & {resultFunc: () => T};

export interface IState {
    notes: R.Dictionary<Note>;
    categories: R.Dictionary<Category>;
    searchForm: TSearchFormState;
    emptyList: TEmptyListState;
}

export const notesSelector: TSelector<R.Dictionary<Note>> = state => state.notes;
export const categoriesSelector: TSelector<R.Dictionary<Category>> = state => state.categories;
export const searchFormSelector: TSelector<TSearchFormState> = state => state.searchForm;
export const emptyListSelector: TSelector<TEmptyListState> = state => state.emptyList;

export const categories: R.Dictionary<Category> = {
    '600k1': {id: '600k1', title: 'book', notes: ['book1', 'book2'], color: 'violet'},
    'ch4p73r2': {id: 'ch4p73r2', title: 'chapter', notes: ['chap1', 'chap2'], color: 'purple'},
    '5c3n33': {id: '5c3n33', title: 'scene', notes: ['scen1', 'scen2'], color: 'pink'},
    'ch4r4c73r4': {id: 'ch4r4c73r4', title: 'character', notes: ['char1', 'char2'], color: 'olive'},
}

export const notes: R.Dictionary<Note> = {
    'book1': {id: 'book1', title: 'Book One', isA: '600k1', linkedWith: ['char1', 'char2'], belongsTo: [], contains: ['chap1', 'chap2', 'scen1', 'scen2']},
    'book2': {id: 'book2', title: 'Book Two', isA: '600k1', linkedWith: [], belongsTo: [], contains: []},
    'chap1': {id: 'chap1', title: 'Chapter One', isA: 'ch4p73r2', linkedWith: ['char1', 'char2'], belongsTo: ['book1'], contains: ['scen1', 'scen2']},
    'chap2': {id: 'chap2', title: 'Chapter Two', isA: 'ch4p73r2', linkedWith: [], belongsTo: ['book1'], contains: []},
    'scen1': {id: 'scen1', title: 'Scene 1-1', isA: '5c3n33', linkedWith: ['char1'], belongsTo: ['chap1', 'book1'], contains: []},
    'scen2': {id: 'scen2', title: 'Scene 1-2', isA: '5c3n33', linkedWith: ['char1', 'char2'], belongsTo: ['chap1', 'book1'], contains: []},
    'char1': {id: 'char1', title: 'GoodGood', isA: 'ch4r4c73r4', linkedWith: ['scen1', 'scen2', 'chap1', 'book1'], belongsTo: [], contains: []},
    'char2': {id: 'char2', title: 'GoodBad', isA: 'ch4r4c73r4', linkedWith: ['scen2', 'chap1', 'book1'], belongsTo: [], contains: []},
}

export const initialState = {
    categories,
    notes,
}

const books = R.pipe(
    R.filter(hasCategory('600k1')),
    R.values,
    R.map(R.prop('id')),
)(notes)

const groupBy = R.curry((groups: string[], notes: Note[]) => (
    groups.reduce((acc, curr) => ({
        ...acc,
        [curr]: notes.filter(isRelatedTo(curr))
    }), {})
))

export const scenesByBook = R.pipe(
    R.filter(hasCategory('5c3n33')),
    R.values,
    groupBy(books),
)(notes)
