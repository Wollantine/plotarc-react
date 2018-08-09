import * as R from 'ramda';
import { Category } from './Category';
import { Note } from './Note';
import { Either } from 'tsmonad';

export interface Group {
    header: Either<string, Category>;
    notes: Note[];
}

export const groupId = (group: Group) => group.header.caseOf({
    left: R.identity,
    right: R.prop('id'),
})
