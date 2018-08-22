import { connect } from 'react-redux';
import { GroupByConditionView } from './GroupByConditionView';
import { IState, categoriesSelector } from 'redux/appState';
import * as R from 'ramda';
import { selectedGroupBySelector } from '../SearchFormState';
import { selectGroupBy } from '../SearchFormActions';

const mapState = (state: IState) => ({
    categories: R.values(categoriesSelector(state)),
    selectedGroupBy: selectedGroupBySelector(state),
})

const mapDispatch = (dispatch) => ({
    onGroupBySelect: (category) => dispatch(selectGroupBy(category)),
})

export const GroupByCondition = connect(mapState, mapDispatch)(GroupByConditionView);
