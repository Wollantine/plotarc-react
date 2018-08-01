import * as React from 'react';
import { Item } from 'semantic-ui-react';
import { Note } from 'model/Types';
import { createComponent } from 'react-fela';

export interface IProps {
    notes: Note[];
}

const Container = createComponent(() => ({
    marginTop: '50px',
    marginRight: '50px',
}))

const NoteCard = createComponent(() => ({
    backgroundColor: 'white !important',
    borderRadius: '5px !important',
    border: '1px solid #eee !important',
    boxShadow: '2px 2px 2px -1px #ccc !important',
    ':hover': {
        boxShadow: '2px 2px 4px 0px #ccc !important'
    }
}), Item as any)

export const NoteListView: React.StatelessComponent<IProps> = ({notes}) => (
    <Container>
        <Item.Group>
            {notes.map(({title}) => (
                <NoteCard key={title}>
                        <Item.Content>
                            <Item.Header>{title}</Item.Header>
                            <Item.Description>Blabla bla bla bla bla bla bla bllabla bla bla bla bla bla bla blaa</Item.Description>
                        </Item.Content> 
                </NoteCard>
            ))}
        </Item.Group>
    </Container>
);
