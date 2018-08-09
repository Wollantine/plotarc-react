import { expect } from 'chai';
import { groupsSelector, hasZeroNotes } from './ListDisplay';
import { CategoryBuilder } from 'model/CategoryBuilder';
import { NoteBuilder } from 'model/NoteBuilder';
import { Either } from 'tsmonad';


describe('ListDisplay', () => {
    describe('groupsSelector', () => {
        it('should return an empty array for an empty array of notes', () => {
            const notes = [];
            const categories = {'1': CategoryBuilder({id: '1'})};
            expect(groupsSelector.resultFunc(notes, categories)).to.deep.equal([]);
        });

        it('should return a list of one Group if there is only one category', () => {
            const notes: any = [
                NoteBuilder({id: 'n1', isA: 'c1'}),
                NoteBuilder({id: 'n2', isA: 'c1'}),
            ];
            const categories = {'c1': CategoryBuilder({id: 'c1'})};
            expect(groupsSelector.resultFunc(notes, categories)).to.have.length(1);
        });

        it('should return a list of two Groups if there are two categories', () => {
            const notes: any = [
                NoteBuilder({id: 'n1', isA: 'c1'}),
                NoteBuilder({id: 'n2', isA: 'c2'}),
                NoteBuilder({id: 'n3', isA: 'c1'}),
            ];
            const categories = {
                'c1': CategoryBuilder({id: 'c1'}),
                'c2': CategoryBuilder({id: 'c2'}),
            };
            expect(groupsSelector.resultFunc(notes, categories)).to.have.length(2);
        });
    });

    describe('hasZeroNotes', () => {
        const makeProps = groupedNotes => ({groupedNotes});

        it('should return true for an empty list of notes', () => {
            const sut = makeProps(Either.left([]));
            expect(hasZeroNotes(sut)).to.be.true;
        });

        it('should return false for a nonempty list of notes', () => {
            const sut = makeProps(Either.left([NoteBuilder({}), NoteBuilder({})]));
            expect(hasZeroNotes(sut)).to.be.false;
        });
        
        it('should return true for an empty list of groups', () => {
            const sut = makeProps(Either.right([]));
            expect(hasZeroNotes(sut)).to.be.true;
        });

        it('should return true for a list of empty groups', () => {
            const sut = makeProps(Either.right([
                {category: '1', notes: []},
                {category: '2', notes: []},
            ]));
            expect(hasZeroNotes(sut)).to.be.true;
        });

        it('should return false if just one of the groups has notes', () => {
            const sut = makeProps(Either.right([
                {category: '1', notes: []},
                {category: '2', notes: [NoteBuilder({})]},
                {category: '2', notes: []},
            ]));
            expect(hasZeroNotes(sut)).to.be.false;
        });

        it('should return false for a list of nonempty groups', () => {
            const sut = makeProps(Either.right([
                {category: '1', notes: [NoteBuilder({})]},
                {category: '2', notes: [NoteBuilder({})]},
            ]));
            expect(hasZeroNotes(sut)).to.be.false;
        });
    });
});
