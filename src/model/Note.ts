import { Indexable, idOf } from './Indexable';

export type Note = Indexable & {
    isA: string;
    linkedWith: string[];
    belongsTo: string[];
    contains: string[];
}

export type TNoteList = {notes: Note[]};
export type TNoteOrId = Note | string;
