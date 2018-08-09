import * as R from 'ramda';
import { connect } from 'react-redux';
import { notesSelector, IState, categoriesSelector, TSelector } from '../../redux/appState';
import { Note, isA, relatedTo } from 'model/Note';
import { createSelector } from 'reselect';
import { selectedCategorySelector, selectedRelatedToSelector } from '../SearchForm/SearchFormState';
import { IProps, ListDisplayView, Group } from './ListDisplayView';
import { Either, Maybe } from 'tsmonad';
import { branch, renderComponent } from 'recompose';
import { EmptyList } from './EmptyList/EmptyList';


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

const eitherNotesOrGroups = (groups: Group[]): Either<Note[], Group[]> => (
    groups.length <= 1
        ? Either.left(R.propOr([], 'notes', R.head(groups)))
        : Either.right(groups)
)

const mapState = (state: IState): IProps => ({
    groupedNotes: eitherNotesOrGroups(groupsSelector(state)),
})

export const hasZeroNotes = ({groupedNotes}: IProps) => groupedNotes.caseOf({
    left: R.isEmpty,
    right: R.either(R.isEmpty, R.all(R.propSatisfies(R.isEmpty, 'notes'))),
});

const emptyListWhenNoResults = branch(hasZeroNotes, renderComponent(EmptyList));

export const ListDisplay = R.compose(
    connect(mapState),
    emptyListWhenNoResults,
)(ListDisplayView);
