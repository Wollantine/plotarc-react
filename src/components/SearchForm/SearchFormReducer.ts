import { combineReducers } from 'redux';
import { reducerHush } from "../../redux/genericReducers";
import { SELECT_CATEGORY, SELECT_RELATED_TO, SELECT_GROUP_BY } from "./SearchFormActions";
import { Maybe } from 'tsmonad';

const selectedCategoryId = reducerHush((state, action) => ({
    [SELECT_CATEGORY]: () => action.categoryId,
}), Maybe.nothing())

const selectedRelatedToId = reducerHush((state, action) => ({
    [SELECT_RELATED_TO]: () => action.noteId,
}), Maybe.nothing())

const selectedGroupById = reducerHush((state, action) => ({
    [SELECT_GROUP_BY]: () => action.categoryId,
}), Maybe.nothing())

export const searchForm = combineReducers({
    selectedCategoryId,
    selectedRelatedToId,
    selectedGroupById,
})
