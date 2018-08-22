import * as R from 'ramda';
import { connect } from 'react-redux';
import { categoriesSelector, IState } from '../../redux/appState';
import { selectedCategorySelector, selectedConditionSelector, ECondition } from './SearchFormState';
import { SearchFormView, IProps, IActions } from './SearchFormView';
import { selectCategory, selectCondition } from './SearchFormActions';
import { Indexable } from 'model/Indexable';
import { RelatedToCondition } from './RelatedToCondition/RelatedToCondition';
import { GroupByCondition } from './GroupByCondition/GroupByCondition';


const conditionItems = {
    [ECondition.relatedTo]: 'Related to',
    [ECondition.groupBy]: 'Group by',
}

const conditionComponents = {
    [ECondition.relatedTo]: RelatedToCondition,
    [ECondition.groupBy]: GroupByCondition,
}

const conditionToIndexable = (condition: ECondition): Indexable => (
    {id: condition, title: conditionItems[condition]}
)

const conditionsAsIndexables: Indexable[] = R.pipe(
    R.keys,
    R.map(k => ECondition[k]),
    R.map(conditionToIndexable),
)(conditionItems)

const mapState = (state: IState): IProps => {
    const maybeCondition = selectedConditionSelector(state);
    return {
        categories: R.values(categoriesSelector(state)),
        conditions: conditionsAsIndexables,
        selectedCategory: selectedCategorySelector(state),
        selectedCondition: maybeCondition.map(conditionToIndexable),
        conditionComponent: maybeCondition.map(cond => conditionComponents[cond]),
    }
}

const mapDispatch = (dispatch): IActions => ({
    onCategorySelect: (category) => dispatch(selectCategory(category)),
    onConditionSelect: (condition) => dispatch(selectCondition(condition.map(c => ECondition[c]))),
})

export const SearchForm = connect(mapState, mapDispatch)(SearchFormView);
