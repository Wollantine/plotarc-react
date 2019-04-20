import * as React from 'react'
import {complement as not, both, either} from 'ramda';
import { EmptyList } from './EmptyList/EmptyList';
import * as R from 'ramda';
import { Note } from 'model/Note';
import { notesSelector, categoriesSelector } from '../../redux/appState';
import { connect } from 'react-redux';
import { selectedCategorySelector, selectedRelatedToSelector, selectedGroupBySelector } from '../SearchForm/SearchFormState';
import { hasCategory, isRelatedTo, filterNotes } from 'queryEngine/filtering';
import { createSelector } from 'reselect';
import { Maybe } from 'tsmonad';
import { Category } from 'model/Category';
import { NoteList } from '../NoteList/NoteList';
import { GroupList } from './GroupList/GroupList';
import { mustGroupByNotes, mustGroupByCategories, notesGroupedByNoteOrCategory } from 'queryEngine/grouping';

const hasOnlyOneGroup = ({groups}) => R.propOr(0, 'length', groups) === 1
const mustGroupByNotesWhithProps = ({selectedGroupBy}) => mustGroupByNotes(selectedGroupBy)
const mustGroupByCategoriesWhithProps = ({selectedCategory}) => mustGroupByCategories(selectedCategory)

const mustShowGroupList = both(
    not(hasOnlyOneGroup),
    either(mustGroupByNotesWhithProps, mustGroupByCategoriesWhithProps),
)

const isListEmpty = (props) => (
    mustShowGroupList(props) ? R.isEmpty(props.groups) : R.isEmpty(props.notes)
)

const ListDisplayView = props => {
    if (isListEmpty(props)) {
        return <EmptyList />
    }
    if (mustShowGroupList(props)) {
        return <GroupList groups={props.groups} />
    }
    return <NoteList notes={props.notes} />
}

export const filteredNotesSelector = createSelector(
    selectedCategorySelector, selectedRelatedToSelector, notesSelector,
    (selectedCategory: Maybe<Category>, selectedRelatedTo: Maybe<Note>, notes: R.Dictionary<Note>) => {
        const filters = [
            selectedCategory.map(category => hasCategory(category)),
            selectedRelatedTo.map(relatedNote => isRelatedTo(relatedNote)),
        ]
        return filterNotes(filters, R.values(notes))
    }
)

const filteredGroupsSelector = createSelector(
    filteredNotesSelector, selectedCategorySelector, selectedGroupBySelector, categoriesSelector, notesSelector,
    (notes, selectedCategory, selectedGroupBy, allCategories, allNotes) => (
        notesGroupedByNoteOrCategory(notes, selectedGroupBy, selectedCategory, allCategories, allNotes)
    )
)

const mapState = state => ({
    notes: filteredNotesSelector(state),
    groups: filteredGroupsSelector(state),
    selectedCategory: selectedCategorySelector(state),
    selectedGroupBy: selectedGroupBySelector(state),
})

export const ListDisplay = connect(mapState)(ListDisplayView)
