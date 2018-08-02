import {expect} from 'chai';
import { scenesByBook } from '../appState';

describe('Query tests', () => {
    describe('scenesByBook', () => {
        it('should group scenes by book', () => {
            const expected = {
                '1a345': [
                    {id: '1e345', title: 'Scene 1-1', isA: ['5c3n33'], relatedTo: ['1c345', '1a345', '1g345']},
                    {id: '1f345', title: 'Scene 1-2', isA: ['5c3n33'], relatedTo: ['1c345', '1a345', '1g345', '1h345']},
                ],
                '1b345': [],
            };
            expect(scenesByBook).to.deep.equal(expected);
        });
    });
});
