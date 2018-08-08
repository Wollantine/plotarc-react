import { Indexable } from './Indexable';
import * as R from 'ramda';

export type Note = Indexable & {
    isA: string;
    linkedWith: string[];
    belongsTo: string[];
    contains: string[];
}

export type TNoteFilter = (note: Note) => boolean;

export const isA = (category: string): TNoteFilter => R.propEq('isA', category);
export const linkedWith = (note: string): TNoteFilter => R.propSatisfies(R.contains(note), 'linkedWith');
export const belongsTo = (note: string): TNoteFilter => R.propSatisfies(R.contains(note), 'belongsTo');
export const contains = (note: string): TNoteFilter => R.propSatisfies(R.contains(note), 'contains');

export const appearsIn = (note: string): TNoteFilter => R.either(belongsTo(note), linkedWith(note));
export const has = (note: string): TNoteFilter => R.either(contains(note), linkedWith(note));
export const relatedTo = (note: string): TNoteFilter => R.anyPass([linkedWith(note), belongsTo(note), contains(note)]);
