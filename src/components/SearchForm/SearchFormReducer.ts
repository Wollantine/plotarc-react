import { combineReducers } from "../../../node_modules/redux";
import { reducer } from "../../redux/genericReducers";
import { SELECT_CATEGORY } from "./SearchFormActions";
import { Maybe } from 'tsmonad';

const selectedCategory = (state = Maybe.nothing(), action) => reducer(state, action, {
    [SELECT_CATEGORY]: () => action.category,
});

export const searchForm = combineReducers({
    selectedCategory,
});
