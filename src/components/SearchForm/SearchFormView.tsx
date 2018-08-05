import * as React from 'react';
import { Maybe } from 'tsmonad';
import { Selector } from './Selector/Selector';
import { Category } from 'model/Category';
import { Note } from 'model/Note';

export interface IProps {
    categories: Category[];
    notes: Note[];
    selectedCategory: Maybe<Category>;
    selectedRelatedTo: Maybe<Note>;
    selectedGroupBy: Maybe<Category>;
}

export interface IActions {
    onCategorySelect: (category: Maybe<string>) => void;
    onRelatedToSelect: (note: Maybe<string>) => void;
    onGroupBySelect: (category: Maybe<string>) => void;
}

export const SearchFormView: React.StatelessComponent<IProps & IActions> = ({
    categories, notes, selectedCategory, onCategorySelect,
    selectedRelatedTo, onRelatedToSelect,
    selectedGroupBy, onGroupBySelect,
}) => (
    <>
        <Selector
            items={categories}
            resetItem='All categories'
            selectedItem={selectedCategory}
            onSelect={onCategorySelect}
        />
        <span>Related to:</span>
        <Selector
            items={notes}
            selectedItem={selectedRelatedTo}
            onSelect={onRelatedToSelect}
        />
        <span>Group by:</span>
        <Selector
            items={categories}
            selectedItem={selectedGroupBy}
            onSelect={onGroupBySelect}
        />
    </>
);
