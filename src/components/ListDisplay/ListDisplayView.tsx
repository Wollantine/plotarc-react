import * as React from 'react';
import { Category } from 'model/Category';
import { Note } from 'model/Note';
import { NoteGroup } from '../NoteGroup/NoteGroup';
import { Either } from 'tsmonad';
import { NoteList } from '../NoteList/NoteList';

export interface Group {
    category: Category;
    notes: Note[];
}

export interface IProps {
    groups: Either<Group, Group[]>;
}

const GroupList: React.StatelessComponent<{groups: Group[]}> = ({groups}) => (
    <>
        {groups.map(group => <NoteGroup key={group.category.id} {...group}/>)}
    </>
)

export const ListDisplayView: React.StatelessComponent<IProps> = ({groups}) => {
    return groups.caseOf({
        left: group => <NoteList notes={group.notes}/>,
        right: groupList => <GroupList groups={groupList}/>
    })
}
