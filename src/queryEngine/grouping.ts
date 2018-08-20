import * as R from 'ramda';
import { Maybe } from 'tsmonad';
import { Category } from 'model/Category';
import { Note } from 'model/Note';
import * as Group from 'model/Group';
import { isRelatedTo } from './filtering';

// TODO: Abstract to selector
export const hasCategoryGrouping = (selectedCategory: Maybe<Category>) => Maybe.isNothing(selectedCategory)

// TODO: Abstract to selector
export const hasNoteGrouping = (selectedGroupBy: Maybe<Category>) => Maybe.isJust(selectedGroupBy)

export const notesGroupedByCategory = (notes: Note[], categories: R.Dictionary<Category>): Group.Group[] => R.pipe(
    R.groupBy((note: Note) => note.isA),
    R.toPairs,
    R.map(([category, notes]: [string, Note[]]) => Group.fromCategory(categories[category], notes)),
)(notes)

export const notesGroupedByNote = (notes: Note[], groupingNoteIds: string[]): Group.Group[] => (
    groupingNoteIds
        .map(title => Group.fromString(title, notes.filter(isRelatedTo(title))))
)
