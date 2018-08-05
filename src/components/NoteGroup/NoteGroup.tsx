import * as React from 'react';
import { Note } from 'model/Note';
import { Category } from 'model/Category';
import { NoteList } from '../NoteList/NoteList';
import { Label, Container } from 'semantic-ui-react';
import { createComponent } from 'react-fela';

export interface IProps {
    category: Category; 
    notes: Note[];
}

const LabelContainer = createComponent(() => ({
    marginTop: '30px',
    marginBottom: '10px',
}))

const NoteListContainer = createComponent(() => ({
    marginLeft: '20px',
}))

export const NoteGroup: React.StatelessComponent<IProps> = ({category, notes}) => {
    return (
        <>
            <LabelContainer>
                <Label color={category.color}>{category.title}</Label>
            </LabelContainer>
            <NoteListContainer>
                <NoteList notes={notes}/>
            </NoteListContainer>
        </>
    );
}
