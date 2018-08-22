import * as R from 'ramda';
import { connect } from 'react-redux';
import { categoriesSelector, notesSelector, IState } from '../../redux/appState';
import { selectedCategorySelector, selectedConditionSelector, selectedRelatedToSelector, selectedGroupBySelector, ECondition } from './SearchFormState';
import { SearchFormView, IProps, IActions } from './SearchFormView';
import { selectCategory, selectCondition, selectRelatedTo, selectGroupBy } from './SearchFormActions';
import { Indexable } from 'model/Indexable';


const conditionItems = {
    [ECondition.relatedTo]: 'Related to',
    [ECondition.groupBy]: 'Group by',
}

const conditionToIndexable = (condition: ECondition): Indexable => (
    {id: condition, title: conditionItems[condition]}
)

const conditionsAsIndexables: Indexable[] = R.pipe(
    R.keys,
    R.map(k => ECondition[k]),
    R.map(conditionToIndexable),
)(conditionItems)

const mapState = (state: IState): IProps => ({
    categories: R.values(categoriesSelector(state)),
    notes: R.values(notesSelector(state)),
    conditions: conditionsAsIndexables,
    selectedCategory: selectedCategorySelector(state),
    selectedCondition: selectedConditionSelector(state).map(conditionToIndexable),
    selectedRelatedTo: selectedRelatedToSelector(state),
    selectedGroupBy: selectedGroupBySelector(state),
})

const mapDispatch = (dispatch): IActions => ({
    onCategorySelect: (category) => dispatch(selectCategory(category)),
    onConditionSelect: (condition) => dispatch(selectCondition(condition.map(c => ECondition[c]))),
    onRelatedToSelect: (note) => dispatch(selectRelatedTo(note)),
    onGroupBySelect: (category) => dispatch(selectGroupBy(category)),
})

export const SearchForm = connect(mapState, mapDispatch)(SearchFormView);