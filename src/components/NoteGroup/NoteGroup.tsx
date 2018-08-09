import * as React from 'react';
import { Note } from 'model/Note';
import { Category } from 'model/Category';
import { NoteList } from '../NoteList/NoteList';
import { Label, Container, Header } from 'semantic-ui-react';
import { createComponent } from 'react-fela';
import { Group } from 'model/Group';

const LabelContainer = createComponent(() => ({
    marginTop: '30px',
    marginBottom: '10px',
}))

const NoteListContainer = createComponent(() => ({
    marginLeft: '20px',
}))

const ColorLabel = ({category}: {category: Category}) => (
    <LabelContainer>
        <Label color={category.color}>{category.title}</Label>
    </LabelContainer>
)

export const NoteGroup: React.StatelessComponent<Group> = ({header, notes}) => {
    return (
        <>
            {header.caseOf({
                left: title => <Header>{title}</Header>,
                right: category => <ColorLabel category={category}/>,
            })}
            <NoteListContainer>
                <NoteList notes={notes}/>
            </NoteListContainer>
        </>
    );
}
