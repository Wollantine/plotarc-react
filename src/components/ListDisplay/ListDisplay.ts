import {complement as not, both, either, compose} from 'ramda';
import { branch, renderComponent } from 'recompose';
import { EmptyList } from './EmptyList/EmptyList';
import * as R from 'ramda';
import { Note, TNoteList } from 'model/Note';
import { notesSelector } from '../../redux/appState';
import { connect } from 'react-redux';
import { selectedCategorySelector, selectedRelatedToSelector } from '../SearchForm/SearchFormState';
import { hasCategory, isRelatedTo, filterNotes } from 'queryEngine/filtering';
import { createSelector } from 'reselect';
import { Maybe } from 'tsmonad';
import { Category } from 'model/Category';
import { NoteList } from '../NoteList/NoteList';


const mustGroupByCategories = () => false
const isListEmpty = ({notes}) => R.isEmpty(notes)
const mustGroupByNotes = () => false
const hasOnlyOneGroup = () => false

const mustShowGroupList = both(
    not(hasOnlyOneGroup),
    either(mustGroupByNotes, mustGroupByCategories),
)

// const notesListToGroups = ({notesList}) => {
//     return {
//         groupsBy
//     }
// }

const filteredNotesSelector = createSelector(
    selectedCategorySelector, selectedRelatedToSelector, notesSelector,
    filteredNotesToProps
)

export function filteredNotesToProps(selectedCategory: Maybe<Category>, selectedRelatedTo: Maybe<Note>, notes: R.Dictionary<Note>): TNoteList {
    const filters = [
        selectedCategory.map(category => hasCategory(category)),
        selectedRelatedTo.map(relatedNote => isRelatedTo(relatedNote)),
    ]
    return {
        notes: filterNotes(filters, R.values(notes)),
    }
}

export const ListDisplay = compose(
    connect(filteredNotesSelector),
    branch(isListEmpty, renderComponent(EmptyList)),
    // connect(selectedFiltersToProps),
    // mapProps(notesListToGroups),
    // branch(mustShowGroupList, renderComponent(GroupList)),
)(NoteList)
