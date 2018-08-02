import { connect } from 'react-redux';
import { categoriesSelector, notesSelector } from '../../redux/appState';
import { selectedCategorySelector, selectedRelatedToSelector } from './SearchFormState';
import { SearchFormView, IProps, IActions } from './SearchFormView';
import * as R from 'ramda';
import { DropdownItemProps } from '../../../node_modules/semantic-ui-react';
import { selectCategory, selectRelatedTo } from './SearchFormActions';
import { Maybe } from 'tsmonad';
import { Indexable } from 'model/Types';

const indexableToDropdownItem = (indexable: Indexable): DropdownItemProps => ({
    text: indexable.title,
    value: indexable.id,
})

const NO_VALUE = '#_NO_VALUE_#';

const resetDropdownItem = (title: string): DropdownItemProps => indexableToDropdownItem({title, id: NO_VALUE})

const addResetItem = name => dictionary => ({
    [NO_VALUE]: resetDropdownItem(name),
    ...dictionary,
})

const mapStateToProps = (state): IProps => ({
    categories: R.pipe(
        categoriesSelector,
        R.mapObjIndexed(indexableToDropdownItem),
        addResetItem('All categories'),
    )(state),
    notes: R.pipe(
        notesSelector,
        R.mapObjIndexed(indexableToDropdownItem),
    )(state),
    selectedCategoryText: selectedCategorySelector(state).map(R.prop('title')),
    selectedCategoryValue: selectedCategorySelector(state).map(R.prop('id')),
    selectedRelatedToText: selectedRelatedToSelector(state).map(R.prop('title')),
    selectedRelatedToValue: selectedRelatedToSelector(state).map(R.prop('id')),
})

const mapDispatchToProps = (dispatch): IActions => ({
    onCategorySelect: (category) => {
        const maybeCategory: Maybe<string> = Maybe.maybe(category).chain(c => c === NO_VALUE
            ? Maybe.nothing()
            : Maybe.just(category)
        );
        dispatch(selectCategory(maybeCategory));
    },
    onRelatedToSelect: (note) => dispatch(selectRelatedTo(Maybe.maybe(note))),
})

export const SearchForm = connect(mapStateToProps, mapDispatchToProps)(SearchFormView);