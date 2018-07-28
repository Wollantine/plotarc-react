import {expect} from 'chai';
import { scenesByBook } from '../appState';

describe('Query tests', () => {
    describe('scenesByBook', () => {
        it('should group scenes by book', () => {
            const expected = {
                'Book One': [
                    {title: 'Scene 1-1', isA: ['scene'], relatedTo: ['Chapter One', 'Book One', 'GoodGood']},
                    {title: 'Scene 1-2', isA: ['scene'], relatedTo: ['Chapter One', 'Book One', 'GoodGood', 'GoodBad']},
                ],
                'Book Two': [],
            };
            expect(scenesByBook).to.deep.equal(expected);
        });
    });
});
