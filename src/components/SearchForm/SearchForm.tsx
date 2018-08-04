import { connect } from 'react-redux';
import { categoriesSelector, notesSelector, IState } from '../../redux/appState';
import { selectedCategorySelector, selectedRelatedToSelector } from './SearchFormState';
import { SearchFormView, IProps, IActions } from './SearchFormView';
import * as R from 'ramda';
import { DropdownItemProps } from '../../../node_modules/semantic-ui-react';
import { selectCategory, selectRelatedTo } from './SearchFormActions';
import { Maybe } from 'tsmonad';
import { Indexable } from 'model/Types';
import { createStructuredSelector } from '../../../node_modules/reselect';

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

export const maybeIndexableToMaybeTitle: (x: Maybe<Indexable>) => Maybe<string> = R.map(R.prop('title')) as any;
const maybeIndexableToMaybeId: (x: Maybe<Indexable>) => Maybe<string> = R.map(R.prop('id')) as any;

const categoriesWithNoneDropdownSelector = R.pipe(
    categoriesSelector,
    R.mapObjIndexed(indexableToDropdownItem),
    addResetItem('All categories'),
)

const notesDropdownSelector = R.pipe(
    notesSelector,
    R.mapObjIndexed(indexableToDropdownItem),
)

const mapState: (state: IState) => IProps = createStructuredSelector({
    categories: categoriesWithNoneDropdownSelector,
    notes: notesDropdownSelector,
    selectedCategoryText: R.pipe(selectedCategorySelector, maybeIndexableToMaybeTitle),
    selectedCategoryValue: R.pipe(selectedCategorySelector, maybeIndexableToMaybeId),
    selectedRelatedToText: R.pipe(selectedRelatedToSelector, maybeIndexableToMaybeTitle),
    selectedRelatedToValue: R.pipe(selectedRelatedToSelector, maybeIndexableToMaybeId),
})

const mapDispatch = (dispatch): IActions => ({
    onCategorySelect: (category) => {
        const maybeCategory: Maybe<string> = Maybe.maybe(category).chain(c => c === NO_VALUE
            ? Maybe.nothing()
            : Maybe.just(category)
        );
        dispatch(selectCategory(maybeCategory));
    },
    onRelatedToSelect: (note) => dispatch(selectRelatedTo(Maybe.maybe(note))),
})

export const SearchForm = connect(mapState, mapDispatch)(SearchFormView);