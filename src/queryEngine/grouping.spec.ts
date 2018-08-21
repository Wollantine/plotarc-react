import { expect } from 'chai';
import { NoteBuilder } from 'model/NoteBuilder';
import { CategoryBuilder } from 'model/CategoryBuilder';
import { notesGroupedByCategory, notesGroupedByNote } from './grouping';
import { Either } from 'tsmonad';

describe('grouping', () => {
    describe('notesGroupedByCategory', () => {
        const chapter = CategoryBuilder({id: 'chapter'});
        const scene = CategoryBuilder({id: 'scene'});
        const categories = {chapter, scene};

        it('should return a list of one group with a category header for a list of one note', () => {
            const notes = [NoteBuilder({isA: 'chapter'})];
            const sut = notesGroupedByCategory(notes, {chapter});
            expect(sut).to.have.length(1);
            expect(sut[0]).to.have.property('notes').that.deep.equals(notes);
            expect(sut[0]).to.have.property('header').that.satisfies(
                header => header.equals(Either.right(chapter))
            );
        })

        it('should return one group for each category', () => {
            const notes = [
                NoteBuilder({isA: 'chapter'}),
                NoteBuilder({isA: 'scene'}),
                NoteBuilder({isA: 'scene'}),
                NoteBuilder({isA: 'chapter'}),
            ]
            const sut = notesGroupedByCategory(notes, categories);
            expect(sut).to.have.length(2);
            expect(sut[0].notes).to.have.length(2);
            expect(sut[1].notes).to.have.length(2);
        })

        it('should return an empty list if there are no notes', () => {
            expect(notesGroupedByCategory([], categories)).to.deep.equal([]);
        })
    })

    describe('notesGroupedByNote', () => {
        it('should return a list of one group with a string header for a list of one linked note', () => {
            const notes = [NoteBuilder({linkedWith: ['A']})];
            const sut = notesGroupedByNote(notes, ['A']);
            expect(sut).to.have.length(1);
            expect(sut[0]).to.have.property('notes').that.deep.equals(notes);
            expect(sut[0]).to.have.property('header').that.satisfies(
                header => header.equals(Either.left('A'))
            );
        })

        it('should group together all notes related to a note, regardless of how they are related', () => {
            const notes = [
                NoteBuilder({linkedWith: ['A']}),
                NoteBuilder({belongsTo: ['A']}),
                NoteBuilder({contains: ['A']}),
            ]
            const sut = notesGroupedByNote(notes, ['A']);
            expect(sut).to.have.length(1);
            expect(sut[0].notes).to.have.length(3);
        })

        it('should do as many groups as grouping notes', () => {
            const notes = [
                NoteBuilder({belongsTo: ['A']}),
                NoteBuilder({belongsTo: ['B']}),
                NoteBuilder({belongsTo: ['A', 'B']}),
            ]
            const sut = notesGroupedByNote(notes, ['A', 'B', 'C']);
            expect(sut).to.have.length(3);
            expect(sut[0].notes).to.have.length(2);
            expect(sut[1].notes).to.have.length(2);
        })

        it('should return an empty list if there are no grouping notes', () => {
            const notes = [NoteBuilder({linkedWith: ['A']})];
            expect(notesGroupedByNote(notes, [])).to.deep.equal([]);
        })

        it('should return a list of empty groups if there are no notes', () => {
            const sut = notesGroupedByNote([], ['A', 'B']);
            expect(sut).to.have.length(2);
            expect(sut[0].notes).to.have.length(0);
            expect(sut[1].notes).to.have.length(0);
        })
    })
})
