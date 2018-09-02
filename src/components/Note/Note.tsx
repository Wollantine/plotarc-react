import * as React from 'react';
import { createComponent } from 'react-fela';
import { Item, Segment, Input } from 'semantic-ui-react';
import { Note as NoteType } from 'model/Note';
import { Category } from 'model/Category';
import { Editable } from './Editable/Editable';
import { editNoteTitle } from './NoteActions';
import { connect } from 'react-redux';


export interface IProps {
    note: NoteType;
    category: Category;
    setTitle: (noteId: string, title: string) => void;
}

const NoteCard = createComponent(() => ({
    backgroundColor: 'white !important',
    borderRadius: '5px !important',
    border: '1px solid #eee !important',
    boxShadow: '2px 2px 2px -1px #ccc !important',
    padding: '10px 10px 5px 10px',
    ':hover': {
        boxShadow: '2px 2px 4px 0px #bbb !important'
    }
}), Item as any)

export const NoteView: React.StatelessComponent<IProps> = (
    {note, category, setTitle}
) => (
    <Segment color={category.color}>
        <Item.Group>
            <Item>
                <Item.Content>
                    <Editable
                        componentType='h3'
                        value={note.title}
                        onChange={(text) => setTitle(note.id, text)}
                    />
                    <Item.Description>{note.description}</Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
)

const mapDispatch = (dispatch) => ({
    setTitle: (noteId, title) => dispatch(editNoteTitle(noteId, title)),
})

export const Note = connect(x => x, mapDispatch)(NoteView);
