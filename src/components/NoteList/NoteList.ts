import { connect } from 'react-redux';
import { NoteListView } from './NoteListView';
import { categoriesSelector } from '../../redux/appState';

const mapStateToProps = (state) => ({
    categories: categoriesSelector(state),
})

export const NoteList = connect(mapStateToProps)(NoteListView);
