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

export const notesGroupedByNote = (notes: Note[], groupingNotes: Note[]): Group.Group[] => (
    groupingNotes
        .map(({title, id}) => Group.fromString(title, notes.filter(isRelatedTo(id))))
)

export const notesGroupedByNoteOrCategory = (
    filteredNotes: Note[],
    selectedGroupBy: Maybe<Category>,
    selectedCategory: Maybe<Category>,
    categories: R.Dictionary<Category>,
    notes: R.Dictionary<Note>,
): Group.Group[] => {
    const groupingNotes = notesOfMaybeCategory(selectedGroupBy, R.values(notes));
    return mustGroupByNotes(selectedGroupBy)
        ? notesGroupedByNote(filteredNotes, groupingNotes)
        : mustGroupByCategories(selectedCategory)
        ? notesGroupedByCategory(filteredNotes, categories)
        : []
}
