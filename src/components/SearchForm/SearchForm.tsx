import { connect } from 'react-redux';
import { categoriesSelector, notesSelector } from '../../redux/appState';
import { selectedCategorySelector, selectedRelatedToSelector } from './SearchFormState';
import { SearchFormView, IProps, IActions } from './SearchFormView';
import * as R from 'ramda';
import { DropdownItemProps } from '../../../node_modules/semantic-ui-react';
import { selectCategory, selectRelatedTo } from './SearchFormActions';
import { Maybe } from 'tsmonad';
import { Category } from 'model/Types';

const nameToDropdownItem = (name: string): DropdownItemProps => ({
    text: name,
    value: name,
});

const selectTitles = (dict: R.Dictionary<{title: string}>) => (
    R.values(dict)
        .map(R.prop('title'))
        .map(nameToDropdownItem)
)

const mapStateToProps = (state): IProps => ({
    categories: selectTitles(categoriesSelector(state)),
    notes: selectTitles(notesSelector(state)),
    selectedCategory: selectedCategorySelector(state),
    selectedRelatedTo: selectedRelatedToSelector(state),
});

const mapDispatchToProps = (dispatch): IActions => ({
    onCategorySelect: (category) => dispatch(selectCategory(Maybe.maybe(category))),
    onRelatedToSelect: (note) => dispatch(selectRelatedTo(Maybe.maybe(note))),
})

export const SearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchFormView);