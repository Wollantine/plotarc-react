import { Maybe } from 'tsmonad';
import { TAction } from '../../redux/appReducer';

export const SELECT_CATEGORY = 'SELECT_CATEGORY';
export const SELECT_RELATED_TO = 'SELECT_RELATED_TO';
export const SELECT_GROUP_BY = 'SELECT_GROUP_BY';

export const selectCategory = (category: Maybe<string>): TAction => ({
    type: SELECT_CATEGORY,
    category,
})

export const selectRelatedTo = (note: Maybe<string>): TAction => ({
    type: SELECT_RELATED_TO,
    note,
})

export const selectGroupBy = (category: Maybe<string>): TAction => ({
    type: SELECT_GROUP_BY,
    category,
})
