import { TAction } from '../../redux/appReducer';

export const EDIT_NOTE_TITLE = 'EDIT_NOTE_TITLE';

export const editNoteTitle = (noteId: string, title: string): TAction => ({
    type: EDIT_NOTE_TITLE,
    noteId,
    title,
})
