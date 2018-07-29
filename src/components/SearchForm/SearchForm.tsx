import { connect } from 'react-redux';
import { notesSelector, categoriesSelector } from '../../redux/appState';
import { selectedCategorySelector } from './SearchFormState';
import { SearchFormView, IProps, IActions } from './SearchFormView';
import * as R from 'ramda';
import { DropdownItemProps } from '../../../node_modules/semantic-ui-react';
import { selectCategory } from './SearchFormActions';
import { Maybe } from 'tsmonad';

const nameToDropdownItem = (name: string): DropdownItemProps => ({
    text: name,
    value: name,
});

const selectCategories = state => (
    R.values(categoriesSelector(state))
        .map(R.prop('title'))
        .map(nameToDropdownItem)
)

const mapStateToProps = (state): IProps => ({
    // notes: notesSelector(state),
    categories: selectCategories(state),
    selectedCategory: selectedCategorySelector(state),
});

const mapDispatchToProps = (dispatch): IActions => ({
    onCategorySelect: (category) => dispatch(selectCategory(Maybe.maybe(category))),
})

export const SearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchFormView);