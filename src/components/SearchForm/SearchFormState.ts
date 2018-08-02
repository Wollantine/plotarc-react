import {Maybe} from 'tsmonad';
import { TSelector, searchFormSelector } from '../../redux/appState';
import { createSelector } from 'reselect';

export interface TSearchFormState {
    selectedCategory: Maybe<string>;
    selectedRelatedTo: Maybe<string>;
}

export const selectedCategorySelector: TSelector<Maybe<string>> = createSelector(
    searchFormSelector,
    searchForm => searchForm.selectedCategory
);

export const selectedRelatedToSelector: TSelector<Maybe<string>> = createSelector(
    searchFormSelector,
    searchForm => searchForm.selectedRelatedTo
);
