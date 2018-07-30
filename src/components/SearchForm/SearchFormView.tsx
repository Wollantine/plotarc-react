import * as React from 'react';
import { Maybe } from 'tsmonad';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import * as R from 'ramda';

export interface IProps {
    categories: DropdownItemProps[];
    selectedCategory: Maybe<string>;
}

export interface IActions {
    onCategorySelect: (category: string) => void;
}

export const SearchFormView: React.StatelessComponent<IProps & IActions> = ({categories, selectedCategory, onCategorySelect}) => (
    <Dropdown
        search
        deburr
        selection
        selectOnBlur={false}
        options={categories}
        text={selectedCategory.valueOr('Select a category')}
        value={selectedCategory.valueOr(false as any)}
        onChange={(e, {value}) => onCategorySelect(String(value))}
    />
);
