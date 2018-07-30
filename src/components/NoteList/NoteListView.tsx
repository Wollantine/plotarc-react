import * as React from 'react';
import * as R from 'ramda';
import { List } from 'semantic-ui-react';
import { Note } from '../../model/Types';

export interface IProps {
    notes: Note[];
}

export const NoteListView: React.StatelessComponent<IProps> = ({notes}) => (
    <List>
        {notes.map(({title}) => (
            <List.Item key={title}>{title}</List.Item>
        ))}
    </List>
);
