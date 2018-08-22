import {complement as not, both, either, compose} from 'ramda';
import { branch, renderComponent, mapProps } from 'recompose';
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
import { NoteList, IProps as INoteListProps } from '../NoteList/NoteList';
import { GroupList, IProps as IGroupListProps } from './GroupList/GroupList';
import { mustGroupByNotes, mustGroupByCategories, notesGroupedByCategory, notesGroupedByNote, notesGroupedByNoteOrCategory } from 'queryEngine/grouping';

type TProps = INoteListProps & IGroupListProps & {
    selectedCategory: Maybe<Category>;
    selectedGroupBy: Maybe<Category>;
    allCategories: R.Dictionary<Category>;
    allNotes: R.Dictionary<Note>;
}

const hasOnlyOneGroup = ({groups}) => R.propOr(0, 'length', groups) === 1
const mustGroupByNotesWhithProps = ({selectedGroupBy}) => mustGroupByNotes(selectedGroupBy)
const mustGroupByCategoriesWhithProps = ({selectedCategory}) => mustGroupByCategories(selectedCategory)

const mustShowGroupList = both(
    not(hasOnlyOneGroup),
    either(mustGroupByNotesWhithProps, mustGroupByCategoriesWhithProps),
)

const isListEmpty = (props: TProps) => (
    mustShowGroupList(props) ? R.isEmpty(props.groups) : R.isEmpty(props.notes)
)

type TPropsWithoutGroups = Pick<TProps, Exclude<keyof TProps, 'groups'>>;
const notesListToGroups = (props: TPropsWithoutGroups): TProps => {
    const {notes, selectedCategory, selectedGroupBy, allCategories, allNotes} = props;
    return {
        ...props,
        groups: notesGroupedByNoteOrCategory(notes, selectedGroupBy, selectedCategory, allCategories, allNotes),
    }
}

const filteredNotesSelector = createSelector(
    selectedCategorySelector, selectedRelatedToSelector, notesSelector,
    filteredNotesToProps
)

export function filteredNotesToProps(selectedCategory: Maybe<Category>, selectedRelatedTo: Maybe<Note>, notes: R.Dictionary<Note>): INoteListProps {
    const filters = [
        selectedCategory.map(category => hasCategory(category)),
        selectedRelatedTo.map(relatedNote => isRelatedTo(relatedNote)),
    ]
    return {
        notes: filterNotes(filters, R.values(notes)),
    }
}

const filtersSelector = createSelector(
    selectedCategorySelector, selectedGroupBySelector, categoriesSelector, notesSelector,
    (selectedCategory, selectedGroupBy, allCategories, allNotes) => (
        {selectedCategory, selectedGroupBy, allCategories, allNotes}
    )
)

const renderGroupList = mapProps(R.pick(['groups']))(GroupList)
const renderNoteList = mapProps(R.pick(['notes']))(NoteList)

const when = (condition, thenComponent, elseComponent) => (
    (...args) => condition(...args) ? thenComponent(...args) : elseComponent(...args)
)

export const ListDisplay = compose(
    connect(filteredNotesSelector),
    connect(filtersSelector),
    mapProps(notesListToGroups) as any,
    branch(isListEmpty, renderComponent(EmptyList)),
)(when(mustShowGroupList, renderGroupList, renderNoteList))
