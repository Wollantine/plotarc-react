import { expect } from 'chai';
import { filteredNotesSelector } from './ListDisplay';
import { CategoryBuilder } from 'model/CategoryBuilder';
import { NoteBuilder } from 'model/NoteBuilder';
import { Maybe } from 'tsmonad';

describe('ListDisplay', () => {
    describe('filteredNotesToProps', () => {
        const filteredNotesToProps = filteredNotesSelector.resultFunc
        const chapter = CategoryBuilder({id: 'chapter'})
        const tonyStark = NoteBuilder({id: 'TonyStark'})

        const note1 = NoteBuilder({isA: 'chapter'})
        const note2 = NoteBuilder({isA: 'scene', linkedWith: ['TonyStark']})
        const note3 = NoteBuilder({isA: 'character', linkedWith: ['TonyStark']})
        
        const notes = {1: note1, 2: note2, 3: note3}

        it('should filter notes according to all filters', () => {
            const sut = filteredNotesToProps(Maybe.just(chapter), Maybe.just(tonyStark), notes);
            expect(sut).to.deep.equal([]);
        });

        it('should only filter by category if others are Nothing', () => {
            const sut = filteredNotesToProps(Maybe.just(chapter), Maybe.nothing(), notes);
            expect(sut).to.deep.equal([note1]);            
        });

        it('should only filter by relatedTo if others are Nothing', () => {
            const sut = filteredNotesToProps(Maybe.nothing(), Maybe.just(tonyStark), notes);
            expect(sut).to.deep.equal([note2, note3]);
        });

        it('should not filter out any note if all filters are Nothing', () => {
            const sut = filteredNotesToProps(Maybe.nothing(), Maybe.nothing(), notes);
            expect(sut).to.deep.equal([note1, note2, note3]);
        });
    });
});
