import { combineReducers } from 'redux';
import { reducerHush } from '../../../redux/genericReducers';
import { SELECT_CATEGORY, SELECT_GROUP_BY, SELECT_RELATED_TO } from '../../SearchForm/SearchFormActions';

const incrementCircular = x => (x + 1) % 1000

const displayMessageNumber = reducerHush((state, action) => ({
    [SELECT_CATEGORY]: () => incrementCircular(state),
    [SELECT_GROUP_BY]: () => incrementCircular(state),
    [SELECT_RELATED_TO]: () => incrementCircular(state),
}), 0)

export const emptyList = combineReducers({
    displayMessageNumber,
})
