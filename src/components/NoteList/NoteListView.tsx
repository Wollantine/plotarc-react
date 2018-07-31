import * as React from 'react';
import * as R from 'ramda';
import { List, Grid, Item } from 'semantic-ui-react';
import { Note } from '../../model/Types';
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
