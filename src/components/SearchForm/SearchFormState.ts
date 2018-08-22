import { Maybe } from 'tsmonad';
import { TSelector, searchFormSelector, categoriesSelector, notesSelector } from '../../redux/appState';
import { createSelector } from 'reselect';
import { Note } from 'model/Note';
import { Category } from 'model/Category';

export enum ECondition {
    relatedTo = 'relatedTo',
    groupBy = 'groupBy',
}

export interface TSearchFormState {
    selectedCategoryId: Maybe<string>;
    selectedCondition: Maybe<ECondition>;
    selectedRelatedToId: Maybe<string>;
    selectedGroupById: Maybe<string>;
}

export const selectedCategoryIdSelector: TSelector<Maybe<string>> = createSelector(searchFormSelector, s => s.selectedCategoryId)
export const selectedConditionSelector: TSelector<Maybe<ECondition>> = createSelector(searchFormSelector, s => s.selectedCondition)
export const selectedRelatedToIdSelector: TSelector<Maybe<string>> = createSelector(searchFormSelector, s => s.selectedRelatedToId)
export const selectedGroupByIdSelector: TSelector<Maybe<string>> = createSelector(searchFormSelector, s => s.selectedGroupById)

export const selectedCategorySelector: TSelector<Maybe<Category>> = createSelector(
    selectedCategoryIdSelector, categoriesSelector,
    (selectedCategoryId, categories) => selectedCategoryId.map(
        id => categories[id]
    )
)

export const selectedRelatedToSelector: TSelector<Maybe<Note>> = createSelector(
    selectedRelatedToIdSelector, notesSelector,
    (selectedRelatedToId, notes) => selectedRelatedToId.map(
        id => notes[id]
    )
)

export const selectedGroupBySelector: TSelector<Maybe<Category>> = createSelector(
    selectedGroupByIdSelector, categoriesSelector,
    (selectedGroupById, categories) => selectedGroupById.map(
        id => categories[id]
    )
)

