import * as R from 'ramda';
import { connect } from 'react-redux';
import { categoriesSelector, notesSelector, IState } from '../../redux/appState';
import { selectedCategorySelector, selectedRelatedToSelector, selectedGroupBySelector } from './SearchFormState';
import { SearchFormView, IProps, IActions } from './SearchFormView';
import { selectCategory, selectRelatedTo, selectGroupBy } from './SearchFormActions';


const mapState = (state: IState): IProps => ({
    categories: R.values(categoriesSelector(state)),
    notes: R.values(notesSelector(state)),
    selectedCategory: selectedCategorySelector(state),
    selectedRelatedTo: selectedRelatedToSelector(state),
    selectedGroupBy: selectedGroupBySelector(state),
})

const mapDispatch = (dispatch): IActions => ({
    onCategorySelect: (category) => dispatch(selectCategory(category)),
    onRelatedToSelect: (note) => dispatch(selectRelatedTo(note)),
    onGroupBySelect: (category) => dispatch(selectGroupBy(category)),
})

export const SearchForm = connect(mapState, mapDispatch)(SearchFormView);