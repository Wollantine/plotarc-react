export const SELECT_CATEGORY = 'SELECT_CATEGORY';
import { Maybe } from 'tsmonad';
import { TAction } from '../../redux/appReducer';

export const selectCategory = (category: Maybe<string>): TAction => ({
    type: SELECT_CATEGORY,
    category,
});
