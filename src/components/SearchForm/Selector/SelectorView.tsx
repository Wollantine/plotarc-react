import * as React from 'react';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { Maybe } from 'tsmonad';


export interface IProps {
    items: DropdownItemProps[];
    selectedItemText: Maybe<string>;
    selectedItemValue: Maybe<string>;
    onSelect: (selected: string) => void;
}

export const SelectorView: React.StatelessComponent<IProps> = ({
    items, selectedItemText, selectedItemValue, onSelect,
}) => (
    <Dropdown
        search
        deburr
        selection
        selectOnBlur={false}
        options={items}
        text={selectedItemText.valueOr('Select a category')}
        value={selectedItemValue.valueOr(false as any)}
        onChange={(e, {value}) => onSelect(String(value))}
    />
);
