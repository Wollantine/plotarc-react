import {Maybe} from 'tsmonad';
import { TSelector, searchFormSelector, categoriesSelector } from '../../redux/appState';
import { createSelector } from 'reselect';
import { Category } from 'model/Types';

export interface TSearchFormState {
    selectedCategory: Maybe<string>;
    selectedRelatedTo: Maybe<string>;
}

export const selectedCategorySelector: TSelector<Maybe<Category>> = createSelector(
    searchFormSelector, categoriesSelector,
    (searchForm, categories) => searchForm.selectedCategory.map(
        categoryId => categories[categoryId]
    )
);

export const selectedRelatedToSelector: TSelector<Maybe<string>> = createSelector(
    searchFormSelector,
    searchForm => searchForm.selectedRelatedTo
);
