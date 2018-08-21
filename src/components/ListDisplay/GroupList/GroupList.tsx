import * as React from 'react';
import { Note } from 'model/Note';
import { Group, groupId } from 'model/Group';
import { NoteGroup } from '../../NoteGroup/NoteGroup';
import * as R from 'ramda';
import { NoteList } from '../../NoteList/NoteList';

export interface IProps {
    groups: Group[];
}

const Groups: React.StatelessComponent<{groups: Group[]}> = ({groups}) => (
    <>
        {groups.map(group => <NoteGroup key={groupId(group)} {...group}/>)}
    </>
)

const notesOfFirstGroup: (groups: Group[]) => Note[] = R.pipe(R.head, R.propOr([], 'notes')) as any

export const GroupList: React.StatelessComponent<IProps> = ({groups}) => (
    groups.length > 1
        ? <Groups groups={groups}/>
        : <NoteList notes={notesOfFirstGroup(groups)}/>
)
