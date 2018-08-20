import * as R from 'ramda';
import { Category } from './Category';
import { Note } from './Note';
import { Either } from 'tsmonad';

export type THeader = Either<string, Category>;

export interface Group {
    header: THeader;
    notes: Note[];
}

export const fromCategory = R.curry((category: Category, notes: Note[]): Group => ({
    header: Either.right(category),
    notes,
}))

export const fromString = R.curry((str: string, notes: Note[]): Group => ({
    header: Either.left(str),
    notes,
}))

export const groupId = (group: Group) => group.header.caseOf({
    left: R.identity,
    right: R.prop('id'),
})
