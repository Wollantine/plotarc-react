import * as R from 'ramda';

export type Indexable = {
    id: string;
    title: string;
}

export type Note = Indexable & {
    isA: string[];
    relatedTo: string[];
    belongsTo: string[];
    contains: string[];
}

export const isA = (category: string): ((note: Note) => boolean) => R.propSatisfies(R.contains(category), 'isA');
export const relatedTo = (note: string) => R.propSatisfies(R.contains(note), 'relatedTo');
export const belongsTo = (note: string) => R.propSatisfies(R.contains(note), 'belongsTo');
export const contains = (note: string) => R.propSatisfies(R.contains(note), 'contains');

export type Category = Indexable & {
    notes: string[];
}
