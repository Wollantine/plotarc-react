import * as R from 'ramda';
import { connect } from 'react-redux';
import { notesSelector, IState, categoriesSelector, TSelector } from '../../redux/appState';
import { Note } from 'model/Note';
import { createSelector } from 'reselect';
import { selectedCategorySelector, selectedRelatedToSelector, selectedGroupByIdSelector, selectedCategoryIdSelector, selectedGroupBySelector } from '../SearchForm/SearchFormState';
import { Either, Maybe } from 'tsmonad';
import { branch, renderComponent } from 'recompose';
import { EmptyList } from './EmptyList/EmptyList';
import * as Group from 'model/Group';
import { notesGroupedByCategory } from 'queryEngine/grouping';
import { hasCategory, isRelatedTo } from 'queryEngine/filtering';


const categoryFilterSelector = createSelector(
    selectedCategorySelector,
    (selectedCategory) => selectedCategory.caseOf({
        just: category => R.filter(hasCategory(category.id)),
        nothing: () => R.identity,
    })
)

const relatedToFilterSelector = createSelector(
    selectedRelatedToSelector,
    (selectedRelatedTo) => selectedRelatedTo.caseOf({
        just: note => R.filter(isRelatedTo(note.id)),
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

export const notesGroupedByCategorySelector = createSelector(
    filteredNotesSelector, categoriesSelector,
    notesGroupedByCategory
)

const groupingNotesSelector: TSelector<Maybe<string[]>> = createSelector(
    selectedGroupByIdSelector, categoriesSelector,
    (selectedGroupById, categories) => selectedGroupById.map(
        categoryId => categories[categoryId].notes
    )
)

const groupBy = R.curry((groups: string[], notes: Note[]): Group.Group[] => (
    groups.reduce((acc, curr) => ([
        ...acc,
        Group.fromString(curr, notes.filter(isRelatedTo(curr))),
    ]), [] as Group.Group[])
))

type TNotesOrGroups = Either<Note[], Group.Group[]>;

const notesGroupedByNoteSelector: TSelector<TNotesOrGroups> = createSelector(
    filteredNotesSelector, groupingNotesSelector,
    (filteredNotes: Note[], groupingNotes) => groupingNotes.caseOf<TNotesOrGroups>({
        nothing: () => Either.left(filteredNotes),
        just: groupTitles => Either.right(groupBy(groupTitles, filteredNotes)),
    })
)

// const noteGroupsSelector = createSelector(
//     groupingNotesSelector, notesSelector,
//     (groupingNotes) => (
//         groupingNotes.map()
//     )
// )

const eitherNotesOrGroups = (groups: Group.Group[]): TNotesOrGroups => (
    groups.length <= 1
        ? Either.left(R.propOr([], 'notes', R.head(groups)))
        : Either.right(groups)
)

// const isGroupingFactorSelected = createSelector(
//     selectedCategoryIdSelector, selectedGroupByIdSelector,
//     (selectedCategoryId, selectedGroupById) => (
//         Maybe.isJust(selectedCategoryId) || Maybe.isJust(selectedGroupById)
//     )
// )


// const mapState = (state: IState): IProps => ({
//     // groupedNotes: eitherNotesOrGroups(notesGroupedByCategorySelector(state)),
//     listType: (isGroupingFactorSelected(state) && isThereMoreThanOneGroup(state)) ? 'groups' : 'notes',
// })

export const hasZeroNotes = ({groupedNotes}: any) => groupedNotes.caseOf({
    left: R.isEmpty,
    right: R.either(R.isEmpty, R.all(R.propSatisfies(R.isEmpty, 'notes'))),
});

const emptyListWhenNoResults = branch(hasZeroNotes, renderComponent(EmptyList));

// export const ListDisplay = R.compose(
//     // connect(mapState),
//     emptyListWhenNoResults,
// )(ListDisplayView);
