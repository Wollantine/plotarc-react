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
    'book': {title: 'book', notes: ['Book One']},
    'chapter': {title: 'chapter', notes: ['Chapter One', 'Chapter Two']},
    'scene': {title: 'scene', notes: ['Scene 1-1', 'Scene 1-2']},
    'character': {title: 'character', notes: ['GoodGood', 'GoodBad']},
}

export const notes: R.Dictionary<Note> = {
    'Book One': {title: 'Book One', isA: ['book'], relatedTo: ['Chapter One', 'Chapter Two']},
    'Book Two': {title: 'Book Two', isA: ['book'], relatedTo: []},
    'Chapter One': {title: 'Chapter One', isA: ['chapter'], relatedTo: ['Book One', 'Scene 1-1', 'Scene 1-2']},
    'Chapter Two': {title: 'Chapter Two', isA: ['chapter'], relatedTo: ['Book One']},
    'Scene 1-1': {title: 'Scene 1-1', isA: ['scene'], relatedTo: ['Chapter One', 'Book One', 'GoodGood']},
    'Scene 1-2': {title: 'Scene 1-2', isA: ['scene'], relatedTo: ['Chapter One', 'Book One', 'GoodGood', 'GoodBad']},
    'GoodGood': {title: 'GoodGood', isA: ['character'], relatedTo: ['Scene 1-1', 'Scene 1-2', 'Chapter One', 'Book One']},
    'GoodBad': {title: 'GoodBad', isA: ['character'], relatedTo: ['Scene 1-2', 'Chapter One', 'Book One']},
}

export const initialState = {
    categories,
    notes,
}

const books = R.pipe(
    R.filter(isA('book')),
    R.values,
    R.map(R.prop('title')),
)(notes)

const groupBy = R.curry((groups: string[], notes: Note[]) => (
    groups.reduce((acc, curr) => ({
        ...acc,
        [curr]: notes.filter(relatedTo(curr))
    }), {})
))

export const scenesByBook = R.pipe(
    R.filter(isA('scene')),
    R.values,
    groupBy(books),
)(notes)
