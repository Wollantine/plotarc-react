import * as React from 'react';
import { Category } from 'model/Category';
import { Note } from 'model/Note';
import { NoteGroup } from '../NoteGroup/NoteGroup';
import { Either, Maybe } from 'tsmonad';
import { NoteList } from '../NoteList/NoteList';
import { EmptyList } from './EmptyList/EmptyList';

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

export const ListDisplayView: React.StatelessComponent<IProps> = ({groups}) => {
    return groups.caseOf({
        left: maybeGroup => maybeGroup.caseOf({
            just: group => <NoteList notes={group.notes}/>,
            nothing: () => <EmptyList/>,
        }),
        right: groupList => <GroupList groups={groupList}/>
    })
}
