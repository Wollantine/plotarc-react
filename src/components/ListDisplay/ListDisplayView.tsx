import * as React from 'react';
import * as R from 'ramda';
import { Note } from 'model/Note';
import { NoteGroup } from '../NoteGroup/NoteGroup';
import { Either, Maybe } from 'tsmonad';
import { NoteList } from '../NoteList/NoteList';
import { Group, groupId } from 'model/Group';


export interface IProps {
    groupedNotes: Either<Note[], Group[]>;
}


const GroupList: React.StatelessComponent<{groups: Group[]}> = ({groups}) => (
    <>
        {groups.map(group => <NoteGroup key={groupId(group)} {...group}/>)}
    </>
)

export const ListDisplayView: React.StatelessComponent<IProps> = ({groupedNotes}) => {
    return groupedNotes.caseOf({
        left: notes => <NoteList notes={notes}/>,
        right: groupList => <GroupList groups={groupList}/>
    })
}
