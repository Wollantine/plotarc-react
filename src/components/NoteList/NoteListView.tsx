import * as React from 'react';
import { Item } from 'semantic-ui-react';
import { Note as TNote } from 'model/Note';
import { Note } from '../Note/Note';
import { Category } from 'model/Category';


export interface IProps {
    categories: R.Dictionary<Category>;
    notes: TNote[];
}

export const NoteListView = ({notes, categories}: IProps) => (
    <Item.Group>
        {notes.map(note => (
            <Note
                key={note.title}
                note={note}
                category={categories[note.isA]}
            />
        ))}
    </Item.Group>
)
