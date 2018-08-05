import * as React from 'react';
import { Category } from 'model/Category';
import { Note } from 'model/Note';
import { NoteGroup } from '../NoteGroup/NoteGroup';
import { Either, Maybe } from 'tsmonad';
import { NoteList } from '../NoteList/NoteList';
import { Message, Header, Icon, Grid } from 'semantic-ui-react';
import { createComponent } from 'react-fela';

export interface Group {
    category: Category;
    notes: Note[];
}

export interface IProps {
    groups: Either<Maybe<Group>, Group[]>;
}

const GroupList: React.StatelessComponent<{groups: Group[]}> = ({groups}) => (
    <>
        {groups.map(group => <NoteGroup key={group.category.id} {...group}/>)}
    </>
)

const NotFoundSplash = createComponent(() => ({
    marginTop: '100px !important',
}), (props: any) => <Header icon {...props}/>)

const EmptyList = () => (
    <Grid centered columns={1}>
        <NotFoundSplash icon>
            <Icon name="search"/>
            Nothing here.
        </NotFoundSplash>
    </Grid>
)

export const ListDisplayView: React.StatelessComponent<IProps> = ({groups}) => {
    return groups.caseOf({
        left: maybeGroup => maybeGroup.caseOf({
            just: group => <NoteList notes={group.notes}/>,
            nothing: () => <EmptyList/>,
        }),
        right: groupList => <GroupList groups={groupList}/>
    })
}
