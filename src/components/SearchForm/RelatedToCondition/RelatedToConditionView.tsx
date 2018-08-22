import * as React from 'react';
import { Maybe } from 'tsmonad';
import { Selector } from '../Selector/Selector';
import { Note } from 'model/Note';

// TODO Use same view as GroupByCondition

export interface IProps {
    notes: Note[];
    selectedRelatedTo: Maybe<Note>;
    onRelatedToSelect: (note: Maybe<string>) => void;
}

export const RelatedToConditionView: React.StatelessComponent<IProps> = (
    {notes, selectedRelatedTo, onRelatedToSelect}
) => (
    <Selector
        items={notes}
        selectedItem={selectedRelatedTo}
        onSelect={onRelatedToSelect}
        placeholder='Select a note'
    />
)