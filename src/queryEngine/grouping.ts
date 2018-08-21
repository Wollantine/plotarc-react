import * as R from 'ramda';
import { Maybe } from 'tsmonad';
import { Category } from 'model/Category';
import { Note } from 'model/Note';
import * as Group from 'model/Group';
import { isRelatedTo, notesOfMaybeCategory } from './filtering';

// TODO: Abstract to selector
export const mustGroupByCategories = (selectedCategory: Maybe<Category>) => Maybe.isNothing(selectedCategory)

// TODO: Abstract to selector
export const mustGroupByNotes = (selectedGroupBy: Maybe<Category>) => Maybe.isJust(selectedGroupBy)

export const notesGroupedByCategory = (notes: Note[], categories: R.Dictionary<Category>): Group.Group[] => R.pipe(
    R.groupBy((note: Note) => note.isA),
    R.toPairs,
    R.map(([category, notes]: [string, Note[]]) => Group.fromCategory(categories[category], notes)),
)(notes)

export const notesGroupedByNote = (notes: Note[], groupingNoteIds: string[]): Group.Group[] => (
    groupingNoteIds
        .map(title => Group.fromString(title, notes.filter(isRelatedTo(title))))
)

export const notesGroupedByNoteOrCategory = (
    notes: Note[],
    selectedGroupBy: Maybe<Category>,
    selectedCategory: Maybe<Category>,
    categories: R.Dictionary<Category>
): Group.Group[] => {
    const groupingNotes = notesOfMaybeCategory(selectedGroupBy, notes)
        .map(R.prop('id'));
    return mustGroupByNotes(selectedGroupBy)
        ? notesGroupedByNote(notes, groupingNotes)
        : mustGroupByCategories(selectedCategory)
        ? notesGroupedByCategory(notes, categories)
        : []
}
