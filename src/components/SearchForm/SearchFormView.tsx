import * as React from 'react';
import { Maybe } from 'tsmonad';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import * as R from 'ramda';

export interface IProps {
    categories: R.Dictionary<DropdownItemProps>;
    notes: R.Dictionary<DropdownItemProps>;
    selectedCategoryText: Maybe<string>;
    selectedCategoryValue: Maybe<string>;
    selectedRelatedTo: Maybe<string>; 
}

export interface IActions {
    onCategorySelect: (category: string) => void;
    onRelatedToSelect: (note: string) => void;
}

export const SearchFormView: React.StatelessComponent<IProps & IActions> = (
    {
        categories, notes, selectedCategoryText,
        selectedCategoryValue, onCategorySelect,
        selectedRelatedTo, onRelatedToSelect
    }
) => (
    <>
        <Dropdown
            key="categoryFilter"
            search
            deburr
            selection
            selectOnBlur={false}
            options={R.values(categories)}
            text={selectedCategoryText.valueOr('Select a category')}
            value={selectedCategoryValue.valueOr(false as any)}
            onChange={(e, {value}) => onCategorySelect(String(value))}
        />
        <span>Related to:</span>
        <Dropdown
            key="relatedTo"
            search
            deburr
            selection
            selectOnBlur={false}
            options={R.values(notes)}
            text={selectedRelatedTo.valueOr('Select a note')}
            value={selectedRelatedTo.valueOr(false as any)}
            onChange={(e, {value}) => onRelatedToSelect(String(value))}
        />
    </>
);
