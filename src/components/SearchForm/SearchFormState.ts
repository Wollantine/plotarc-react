import {Maybe} from 'tsmonad';
import { TSelector, searchFormSelector, categoriesSelector, notesSelector } from '../../redux/appState';
import { createSelector } from 'reselect';
import { Note } from 'model/Note';
import { Category } from 'model/Category';

export interface TSearchFormState {
    selectedCategory: Maybe<string>;
    selectedRelatedTo: Maybe<string>;
}

export const selectedCategorySelector: TSelector<Maybe<Category>> = createSelector(
    searchFormSelector, categoriesSelector,
    (searchForm, categories) => searchForm.selectedCategory.map(
        categoryId => categories[categoryId]
    )
)

export const selectedRelatedToSelector: TSelector<Maybe<Note>> = createSelector(
    searchFormSelector, notesSelector,
    (searchForm, notes) => searchForm.selectedRelatedTo.map(
        noteId => notes[noteId]
    )
)
