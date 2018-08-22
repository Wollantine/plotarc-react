import { Note } from "./Note";

const defaultNote: Note = {
    id: 'n1',
    title: 'Note One',
    isA: 'c1',
    belongsTo: [],
    contains: [],
    linkedWith: [],
    description: 'Test description.',
}

export const NoteBuilder = (custom: Partial<Note>): Note => ({
    ...defaultNote,
    ...custom,
})
