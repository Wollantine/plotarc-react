import { Maybe } from 'tsmonad';
import { Indexable } from 'model/Indexable';
import { mapProps } from 'recompose';
import { DropdownItemProps } from 'semantic-ui-react';
import { SelectorView, IProps as ISelectorProps } from './SelectorView';
import * as R from 'ramda';

export interface IProps {
    items: Indexable[];
    resetItem?: string;
    selectedItem: Maybe<Indexable>;
    placeholder?: string;
    onSelect: (selected: Maybe<string>) => void;
}

const NO_VALUE = '#_NO_VALUE_#';

const indexableToDropdownItem = (indexable: Indexable): DropdownItemProps => ({
    text: indexable.title,
    value: indexable.id,
})

const resetDropdownItem = (title: string): DropdownItemProps => indexableToDropdownItem({title, id: NO_VALUE})

const addResetItem = (resetItem?: string) => list => (
    Array.prototype.concat(
        Maybe.maybe(resetItem).map(resetDropdownItem).valueOr([]),
        list,
    )
)

export const maybeIndexableToMaybeTitle: (x: Maybe<Indexable>) => Maybe<string> = R.map(R.prop('title')) as any
const maybeIndexableToMaybeId: (x: Maybe<Indexable>) => Maybe<string> = R.map(R.prop('id')) as any

const noValueToNothing = (selected: string): Maybe<string> => (
    Maybe.maybe(selected).chain(s => s === NO_VALUE
        ? Maybe.nothing()
        : Maybe.just(s)
    )
)

const propsToSelectorProps = (props: IProps): ISelectorProps => ({
    items: R.pipe(
        R.map(indexableToDropdownItem),
        addResetItem(props.resetItem),
    )(props.items),
    selectedItemText: maybeIndexableToMaybeTitle(props.selectedItem),
    selectedItemValue: maybeIndexableToMaybeId(props.selectedItem),
    placeholder: Maybe.maybe(props.placeholder),
    onSelect: (selected: string) => props.onSelect(noValueToNothing(selected)),
})

export const Selector = mapProps(propsToSelectorProps)(SelectorView)
