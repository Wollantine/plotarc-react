import * as React from 'react';
import { Item } from 'semantic-ui-react';
import { Note as NoteType } from 'model/Note';
import { Note } from '../Note/Note';
import { Category } from 'model/Category';

export interface IReduxProps {
    categories: R.Dictionary<Category>;
}

export interface IProps {
    notes: NoteType[];
}

export const NoteListView: React.StatelessComponent<IReduxProps & IProps> = ({notes, categories}) => (
    <Item.Group>
        {notes.map(note => <Note key={note.title} note={note} category={categories[note.isA]}/>)}
    </Item.Group>
)
