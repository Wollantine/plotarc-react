import { Indexable } from './Indexable';
import * as R from 'ramda';

export type Note = Indexable & {
    isA: string;
    relatedTo: string[];
    belongsTo: string[];
    contains: string[];
}

export const isA = (category: string): ((note: Note) => boolean) => R.propEq('isA', category);
export const relatedTo = (note: string) => R.propSatisfies(R.contains(note), 'relatedTo');
export const belongsTo = (note: string) => R.propSatisfies(R.contains(note), 'belongsTo');
export const contains = (note: string) => R.propSatisfies(R.contains(note), 'contains');
