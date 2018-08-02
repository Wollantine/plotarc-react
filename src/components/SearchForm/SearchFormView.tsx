import * as React from 'react';
import { Maybe } from 'tsmonad';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import * as R from 'ramda';

export interface IProps {
    categories: DropdownItemProps[];
    notes: DropdownItemProps[];
    selectedCategory: Maybe<string>;
    selectedRelatedTo: Maybe<string>;    
}

export interface IActions {
    onCategorySelect: (category: string) => void;
    onRelatedToSelect: (note: string) => void;
}

export const SearchFormView: React.StatelessComponent<IProps & IActions> = ({categories, notes, selectedCategory, onCategorySelect, selectedRelatedTo, onRelatedToSelect}) => (
    <>
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
        <span>Related to:</span>
        <Dropdown
            search
            deburr
            selection
            selectOnBlur={false}
            options={notes}
            text={selectedRelatedTo.valueOr('Select a note')}
            value={selectedRelatedTo.valueOr(false as any)}
            onChange={(e, {value}) => onRelatedToSelect(String(value))}
        />
    </>
);
