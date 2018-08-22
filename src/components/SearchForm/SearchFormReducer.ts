import { combineReducers } from 'redux';
import { reducerHush } from "../../redux/genericReducers";
import { SELECT_CATEGORY, SELECT_RELATED_TO, SELECT_GROUP_BY, SELECT_CONDITION } from "./SearchFormActions";
import { Maybe } from 'tsmonad';

const selectedCategoryId = reducerHush((state, action) => ({
    [SELECT_CATEGORY]: () => action.categoryId,
}), Maybe.nothing())

const selectedCondition = reducerHush((state, action) => ({
    [SELECT_CONDITION]: () => action.condition,
}), Maybe.nothing())

const selectedRelatedToId = reducerHush((state, action) => ({
    [SELECT_RELATED_TO]: () => action.noteId,
}), Maybe.nothing())

const selectedGroupById = reducerHush((state, action) => ({
    [SELECT_GROUP_BY]: () => action.categoryId,
}), Maybe.nothing())

export const searchForm = combineReducers({
    selectedCategoryId,
    selectedCondition,
    selectedRelatedToId,
    selectedGroupById,
})
