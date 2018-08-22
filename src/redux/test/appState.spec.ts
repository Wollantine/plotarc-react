import {expect} from 'chai';
import { scenesByBook, description } from '../appState';

describe('Query tests', () => {
    describe('scenesByBook', () => {
        it('should group scenes by book', () => {
            const expected = {
                'book1': [
                    {id: 'scen1', title: 'Scene 1-1', isA: '5c3n33', linkedWith: ['char1'], belongsTo: ['chap1', 'book1'], contains: [], description},
                    {id: 'scen2', title: 'Scene 1-2', isA: '5c3n33', linkedWith: ['char1', 'char2'], belongsTo: ['chap1', 'book1'], contains: [], description},
                ],
                'book2': [],
            };
            expect(scenesByBook).to.deep.equal(expected);
        });
    });
});
