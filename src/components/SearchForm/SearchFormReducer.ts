import { combineReducers } from 'redux';
import { reducer, reducerHush } from "../../redux/genericReducers";
import { SELECT_CATEGORY, SELECT_RELATED_TO } from "./SearchFormActions";
import { Maybe } from 'tsmonad';

const selectedCategory = reducerHush((state, action) => ({
    [SELECT_CATEGORY]: () => action.category,
}), Maybe.nothing())

const selectedRelatedTo = reducerHush((state, action) => ({
    [SELECT_RELATED_TO]: () => action.note,
}), Maybe.nothing())

export const searchForm = combineReducers({
    selectedCategory,
    selectedRelatedTo,
})
