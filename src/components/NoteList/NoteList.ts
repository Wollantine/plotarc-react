import * as R from 'ramda';
import { connect } from 'react-redux';
import { NoteListView, IProps } from './NoteListView';
import { notesSelector, IState } from '../../redux/appState';
import { Note, isA, relatedTo } from 'model/Types';
import { createSelector } from 'reselect';
import { selectedCategorySelector, selectedRelatedToSelector } from '../SearchForm/SearchFormState';


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

const selectNotes = createSelector(
    notesSelector, categoryFilterSelector, relatedToFilterSelector,
    (notes, categoryFilter, relatedToFilter) => R.pipe(
        R.values,
        categoryFilter,
        relatedToFilter,
    )(notes)
)

const mapStateToProps = (state): IProps => ({
    notes: selectNotes(state),
})

export const NoteList = connect(mapStateToProps)(NoteListView);