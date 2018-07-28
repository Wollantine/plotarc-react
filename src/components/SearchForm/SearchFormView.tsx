import * as React from 'react';
import { Maybe } from 'tsmonad';

export interface IProps {
    categories: string[];
    selectedCategory: Maybe<string>;
}

export const SearchFormView = ({categories, selectedCategory}) => (
    <div></div>
);
