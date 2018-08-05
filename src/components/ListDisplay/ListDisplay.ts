import * as R from 'ramda';
import { connect } from 'react-redux';
import { notesSelector, IState, categoriesSelector } from '../../redux/appState';
import { Note, isA, relatedTo } from 'model/Note';
import { createSelector } from 'reselect';
import { selectedCategorySelector, selectedRelatedToSelector } from '../SearchForm/SearchFormState';
import { IProps, ListDisplayView, Group } from './ListDisplayView';
import { Either, Maybe } from 'tsmonad';


const categoryFilterSelector = createSelector(
    selectedCategorySelector,
    (selectedCategory) => selectedCategory.caseOf({
        just: category => R.filter(isA(category.id)),
        nothing: () => R.identity,
    })
)

const relatedToFilterSelector = createSelector(
    selectedRelatedToSelector,
    (selectedRelatedTo) => selectedRelatedTo.caseOf({
        just: note => R.filter(relatedTo(note.id)),
        nothing: () => R.identity,
    })
)

const filteredNotesSelector = createSelector(
    notesSelector, categoryFilterSelector, relatedToFilterSelector,
    (notes, categoryFilter, relatedToFilter) => R.pipe(
        R.values,
        categoryFilter,
        relatedToFilter,
    )(notes)
)

export const groupsSelector = createSelector(
    filteredNotesSelector, categoriesSelector,
    (filteredNotes, categories) => R.pipe(
        R.groupBy((note: Note) => note.isA),
        R.toPairs,
        R.map(([category, notes]: [string, Note[]]) => ({
            category: categories[category],
            notes,
        }))
    )(filteredNotes)
)

const eitherOneOrMany = <T>(arr: T[]): Either<Maybe<T>, T[]> => (
    arr.length <= 1
        ? Either.left(Maybe.maybe(R.head(arr)))
        : Either.right(arr)
)

const mapState = (state: IState): IProps => ({
    groups: eitherOneOrMany(groupsSelector(state)),
})

export const ListDisplay = connect(mapState)(ListDisplayView);
