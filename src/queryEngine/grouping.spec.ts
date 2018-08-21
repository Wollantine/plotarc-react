import { expect } from 'chai';
import { NoteBuilder } from 'model/NoteBuilder';
import { CategoryBuilder } from 'model/CategoryBuilder';
import { notesGroupedByCategory } from './grouping';
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
            expect(sut[0]).to.have.property('notes').that.deep.equal(notes);
            expect(sut[0]).to.have.property('header').that.satisfies(header => header.equals(Either.right(chapter)));
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
})
