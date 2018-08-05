import * as React from 'react';
import { Item } from 'semantic-ui-react';
import { Note as NoteType } from 'model/Note';
import { createComponent } from 'react-fela';
import { Note } from '../Note/Note';

export interface IProps {
    notes: NoteType[];
}

export const NoteListView: React.StatelessComponent<IProps> = ({notes}) => (
    <Item.Group>
        {notes.map(note => <Note key={note.title} {...note}/>)}
    </Item.Group>
)
