import { Category } from "./Category";

const defaultCategory: Category = {
    id: 'c1',
    title: 'Category One',
    color: 'black',
    notes: [],
}

export const CategoryBuilder = (custom: Partial<Category>): Category => ({
    ...defaultCategory,
    ...custom,
})
