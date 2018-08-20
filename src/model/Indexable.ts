export type Indexable = {
    id: string;
    title: string;
}

export const idOf = (indexable: Indexable | string): string => (
    typeof indexable === 'string' ? indexable : indexable.id
)
