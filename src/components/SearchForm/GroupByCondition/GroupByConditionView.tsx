import * as React from 'react';
import { Maybe } from 'tsmonad';
import { Category } from 'model/Category';
import { Selector } from '../Selector/Selector';

export interface IProps {
    categories: Category[];
    selectedGroupBy: Maybe<Category>;
    onGroupBySelect: (category: Maybe<string>) => void;
}

export const GroupByConditionView: React.StatelessComponent<IProps> = (
    {categories, selectedGroupBy, onGroupBySelect}
) => (
    <Selector
        items={categories}
        selectedItem={selectedGroupBy}
        onSelect={onGroupBySelect}
        placeholder='Select a category'
    />
)