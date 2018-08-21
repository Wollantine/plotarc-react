import { Note, TNoteOrId } from 'model/Note';
import { Maybe } from 'tsmonad';
import * as R from 'ramda';
import { TCategoryOrId } from 'model/Category';
import { idOf } from 'model/Indexable';

export type TNoteFilter = (note: Note) => boolean;

export const hasCategory = (category: TCategoryOrId): TNoteFilter => R.propEq('isA', idOf(category));
export const isLinkedWith = (note: TNoteOrId): TNoteFilter => R.propSatisfies(R.contains(idOf(note)), 'linkedWith');
export const belongsTo = (note: TNoteOrId): TNoteFilter => R.propSatisfies(R.contains(idOf(note)), 'belongsTo');
export const contains = (note: TNoteOrId): TNoteFilter => R.propSatisfies(R.contains(idOf(note)), 'contains');

export const appearsIn = (note: TNoteOrId): TNoteFilter => R.either(belongsTo(note), isLinkedWith(note));
export const has = (note: TNoteOrId): TNoteFilter => R.either(contains(note), isLinkedWith(note));
export const isRelatedTo = (note: TNoteOrId): TNoteFilter => R.anyPass([isLinkedWith(note), belongsTo(note), contains(note)]);

const maybeFilterToFilter = maybeFilter => (
    maybeFilter.valueOr(() => true)
)

const allFilters = (maybeFilters: Maybe<TNoteFilter>[]): TNoteFilter => (
    R.allPass(maybeFilters.map(maybeFilterToFilter))
)

export const filterNotes = (maybeFilters: Maybe<TNoteFilter>[], notes: Note[]): Note[] => (
    notes.filter(allFilters(maybeFilters))
)

export const notesOfMaybeCategory = (category: Maybe<TCategoryOrId>, notes: Note[]): Note[] => (
    filterNotes([category.map(hasCategory)], notes)
)
