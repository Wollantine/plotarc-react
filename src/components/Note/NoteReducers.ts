import { Note } from 'model/Note';
import { reducerHush, conditionalReducer } from '../../redux/genericReducers';
import { EDIT_NOTE_TITLE } from './NoteActions';
import * as R from 'ramda';

const throwUninitializedNoteError = () => {
    throw new Error('There is an uninitialized note in the state.');
}

export const reduceNote = reducerHush<Note>((state, action) => ({
    [EDIT_NOTE_TITLE]: R.assoc('title', action.title),
}), throwUninitializedNoteError)

export const noteReducer = conditionalReducer(R.isNil, throwUninitializedNoteError, reduceNote);
