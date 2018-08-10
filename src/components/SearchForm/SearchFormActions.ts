import { Maybe } from 'tsmonad';
import { TAction } from '../../redux/appReducer';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_RELATED_TO = 'SELECT_RELATED_TO';
export const SELECT_GROUP_BY = 'SELECT_GROUP_BY';

export const selectCategory = (categoryId: Maybe<string>): TAction => ({
    type: SELECT_CATEGORY,
    categoryId,
})

export const selectRelatedTo = (noteId: Maybe<string>): TAction => ({
    type: SELECT_RELATED_TO,
    noteId,
})

export const selectGroupBy = (categoryId: Maybe<string>): TAction => ({
    type: SELECT_GROUP_BY,
    categoryId,
})
