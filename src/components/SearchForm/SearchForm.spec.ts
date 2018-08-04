import {expect} from 'chai';
import {Maybe} from 'tsmonad';
import { maybeIndexableToMaybeTitle } from './SearchForm';
import { Indexable } from 'model/Types';

describe('SearchForm', () => {
    describe('maybeIndexableToMaybeTitle', () => {
        it('should map just a note to just a title', () => {
            const note = Maybe.just({id: '', title: 'test'});
            expect(maybeIndexableToMaybeTitle(note).valueOr('')).to.equal('test');
        });

        it('should map nothing to nothing', () => {
            const note: Maybe<Indexable> = Maybe.nothing();
            expect(Maybe.isNothing(maybeIndexableToMaybeTitle(note))).to.be.true;
        });
    });
});
