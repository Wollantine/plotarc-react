import { createSelector } from 'reselect';
import { emptyListSelector } from '../../../redux/appState';
import * as R from 'ramda';

export interface TEmptyListState {
    displayMessageNumber: number;
}

export const displayMessageNumberSelector = createSelector(emptyListSelector, emptyList => emptyList.displayMessageNumber)
