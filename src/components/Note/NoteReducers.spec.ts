import { expect } from 'chai';
import { noteReducer } from './NoteReducers';
import { NoteBuilder } from 'model/NoteBuilder';
import { editNoteTitle } from './NoteActions';

describe('NoteReducers', () => {
    describe('noteReducer', () => {
        it('should throw upon undefined state', () => {
            expect(() => noteReducer(undefined, {type: 'TEST'})).to.throw(Error);
        })

        it('should return state upon unexpected action', () => {
            const note = NoteBuilder({id: 'test'});
            expect(noteReducer(note, {type: 'TEST'})).to.deep.equal(note);
        })

        it('should return the note with the title changed upon EDIT_NOTE_TITLE', () => {
            const note = NoteBuilder({id: 'test', title: 'Old Title'});
            const expected = {...note, title: 'New Title'};
            expect(noteReducer(note, editNoteTitle('test', expected.title))).to.deep.equal(expected);
        })
    })
})