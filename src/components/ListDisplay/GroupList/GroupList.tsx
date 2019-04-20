import * as React from 'react';
import { Maybe } from 'true-myth'
import { Note } from 'model/Note';
import { Group, groupId } from 'model/Group';
import { NoteGroup } from '../../NoteGroup/NoteGroup';
import * as R from 'ramda';
import { NoteList } from '../../NoteList/NoteList';

export interface IProps {
    groups: Group[];
}

const Groups = ({groups}) => (
    <>
        {groups.map(group => (
            <NoteGroup
                key={groupId(group)}
                {...group}
            />
        ))}
    </>
)

const notesOfFirstGroup: (groups: Group[]) => Note[] = groups => (
    Maybe.head(groups)
        .chain(Maybe.property('notes'))
        .unwrapOr([])
)

export const GroupList = ({groups}: IProps) => (
    groups.length > 1
        ? <Groups groups={groups}/>
        : <NoteList notes={notesOfFirstGroup(groups)}/>
)
