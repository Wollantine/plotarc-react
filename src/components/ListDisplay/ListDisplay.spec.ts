import {expect} from 'chai';
import { groupsSelector } from './ListDisplay';
import { CategoryBuilder } from 'model/CategoryBuilder';
import { NoteBuilder } from 'model/NoteBuilder';

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
});
