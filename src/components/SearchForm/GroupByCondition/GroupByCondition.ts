import { connect } from 'react-redux';
import { IState, categoriesSelector } from 'redux/appState';
import * as R from 'ramda';
import { selectedGroupBySelector } from '../SearchFormState';
import { selectGroupBy } from '../SearchFormActions';
import { Selector } from '../Selector/Selector';

const mapState = (state: IState) => ({
    items: R.values(categoriesSelector(state)),
    selectedItem: selectedGroupBySelector(state),
    placeholder: 'Select a category',
})

const mapDispatch = (dispatch) => ({
    onSelect: (category) => dispatch(selectGroupBy(category)),
})

export const GroupByCondition = connect(mapState, mapDispatch)(Selector);
