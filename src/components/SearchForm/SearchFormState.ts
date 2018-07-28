import {Maybe} from 'tsmonad';
import { TSelector, searchFormSelector } from '../../redux/appState';
import { createSelector } from 'reselect';

export interface TSearchFormState {
    selectedCategory: Maybe<string>;
}

export const selectedCategorySelector: TSelector<Maybe<string>> = createSelector(
    searchFormSelector,
    searchForm => searchForm.selectedCategory
);
