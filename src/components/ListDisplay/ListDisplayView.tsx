import * as React from 'react';
import { Category } from 'model/Category';
import { Note } from 'model/Note';
import { NoteGroup } from '../NoteGroup/NoteGroup';
import { Either, Maybe } from 'tsmonad';
import { NoteList } from '../NoteList/NoteList';

export interface Group {
    category: Category;
    notes: Note[];
}

export interface IProps {
    groupedNotes: Either<Note[], Group[]>;
}

const GroupList: React.StatelessComponent<{groups: Group[]}> = ({groups}) => (
    <>
        {groups.map(group => <NoteGroup key={group.category.id} {...group}/>)}
    </>
)

export const ListDisplayView: React.StatelessComponent<IProps> = ({groupedNotes}) => {
    return groupedNotes.caseOf({
        left: notes => <NoteList notes={notes}/>,
        right: groupList => <GroupList groups={groupList}/>
    })
}
