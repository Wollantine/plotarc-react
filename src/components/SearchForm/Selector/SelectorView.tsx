import * as React from 'react';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import { Maybe } from 'tsmonad';


export interface IProps {
    items: DropdownItemProps[];
    selectedItemText: Maybe<string>;
    selectedItemValue: Maybe<string>;
    placeholder: Maybe<string>;
    onSelect: (selected: string) => void;
}

const defaultPlaceholder = '---';

const join = <T extends any>(maybeA: Maybe<T>, maybeB: Maybe<T>): Maybe<T> => (
    maybeA.caseOf({
        just: _ => maybeA,
        nothing: () => maybeB,
    })
)

export const SelectorView: React.StatelessComponent<IProps> = ({
    items, selectedItemText, selectedItemValue, onSelect, placeholder,
}) => (
    <Dropdown
        search
        deburr
        selection
        selectOnBlur={false}
        options={items}
        text={join(selectedItemText, placeholder).valueOr(defaultPlaceholder)}
        value={selectedItemValue.valueOr(false as any)}
        onChange={(e, {value}) => onSelect(String(value))}
    />
);
