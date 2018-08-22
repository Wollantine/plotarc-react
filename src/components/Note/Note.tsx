import * as React from 'react';
import { createComponent } from 'react-fela';
import { Item, Segment } from 'semantic-ui-react';
import { Note as NoteType } from 'model/Note';
import { Category } from 'model/Category';


export interface IProps {
    note: NoteType;
    category: Category;
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

export const Note: React.StatelessComponent<IProps> = ({note, category}) => (
    <Segment color={category.color}>
        <Item.Group>
            <Item>
                <Item.Content>
                    <Item.Header>{note.title}</Item.Header>
                    <Item.Description>{note.description}</Item.Description>
                </Item.Content>
            </Item>
        </Item.Group>
    </Segment>
)