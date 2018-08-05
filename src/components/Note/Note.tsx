import * as React from 'react';
import { createComponent } from 'react-fela';
import { Item } from 'semantic-ui-react';
import { Note as NoteType } from 'model/Note';


const NoteCard = createComponent(() => ({
    backgroundColor: 'white !important',
    borderRadius: '5px !important',
    border: '1px solid #eee !important',
    boxShadow: '2px 2px 2px -1px #ccc !important',
    ':hover': {
        boxShadow: '2px 2px 4px 0px #bbb !important'
    }
}), Item as any)


export const Note: React.StatelessComponent<NoteType> = ({title}) => (
    <NoteCard>
        <Item.Content>
            <Item.Header>{title}</Item.Header>
            <Item.Description>Blabla bla bla bla bla bla bla bllabla bla bla bla bla bla bla blaa</Item.Description>
        </Item.Content> 
    </NoteCard>
)