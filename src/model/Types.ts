import * as R from 'ramda';

// export type Note = {
//     title: string;
//     isA: string[];
//     belongsTo: string[];
//     has: string[];
// }

export type Indexable = {
    id: string;
    title: string;
}

export type Note = Indexable & {
    isA: string[];
    relatedTo: string[];
}

export const isA = (category: string): ((note: Note) => boolean) => R.propSatisfies(R.contains(category), 'isA');
export const relatedTo = (note: string) => R.propSatisfies(R.contains(note), 'relatedTo');

export type Category = Indexable & {
    notes: string[];
}
