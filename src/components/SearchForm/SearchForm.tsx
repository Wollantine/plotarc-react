import { connect } from 'react-redux';
import { notesSelector, categoriesSelector } from '../../redux/appState';
import { selectedCategorySelector } from './SearchFormState';
import { SearchFormView, IProps } from './SearchFormView';
import * as R from 'ramda';


const mapStateToProps = (state): IProps => ({
    // notes: notesSelector(state),
    categories: R.values(categoriesSelector(state)).map(R.prop('title')),
    selectedCategory: selectedCategorySelector(state),
});

const mapDispatchToProps = (dispatch) => ({

})

export const SearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchFormView);