import * as React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { NoteListView, IProps } from './NoteListView';
import { notesSelector, IState } from '../../redux/appState';
import { Note, isA } from 'model/Types';
import { createSelector } from 'reselect';
import { selectedCategorySelector } from '../SearchForm/SearchFormState';


const selectNotes = createSelector(
    notesSelector, selectedCategorySelector,
    (notes, selectedCategory) => R.pipe(
        R.values,
        (selectedCategory.caseOf({
            just: category => R.filter(isA(category)),
            nothing: () => R.identity,
        })),
    )(notes)
)
// (state: IState) => R.pipe(
//     notesSelector,
//     R.values,
// )(state);

const mapStateToProps = (state): IProps => ({
    notes: selectNotes(state),
})

export const NoteList = connect(mapStateToProps)(NoteListView);