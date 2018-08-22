import * as React from 'react';
import { Maybe } from 'tsmonad';
import { Selector } from './Selector/Selector';
import { Category } from 'model/Category';
import { Indexable } from 'model/Indexable';

export interface IProps {
    categories: Category[];
    conditions: Indexable[];
    selectedCategory: Maybe<Category>;
    selectedCondition: Maybe<Indexable>;
    conditionComponent: Maybe<React.ComponentClass>;
}

export interface IActions {
    onCategorySelect: (category: Maybe<string>) => void;
    onConditionSelect: (condition: Maybe<string>) => void;
}

export const SearchFormView: React.StatelessComponent<IProps & IActions> = ({
    categories, conditions, conditionComponent,
    selectedCategory, onCategorySelect,
    selectedCondition, onConditionSelect,
}) => (
    <>
        <Selector
            items={categories}
            resetItem='All categories'
            selectedItem={selectedCategory}
            onSelect={onCategorySelect}
            placeholder='Select a category'
        />
        <Selector
            items={conditions}
            resetItem='Remove condition'
            selectedItem={selectedCondition}
            onSelect={onConditionSelect}
        />
        {conditionComponent.caseOf({
            just: Condition => <Condition/>,
            nothing: () => null,
        })}
    </>
);
