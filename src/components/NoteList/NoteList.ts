import { connect } from 'react-redux';
import { NoteListView, IProps, IReduxProps } from './NoteListView';
import { categoriesSelector } from '../../redux/appState';
export { IProps } from './NoteListView';

const mapStateToProps = (state): IReduxProps => ({
    categories: categoriesSelector(state),
})

export const NoteList = connect(mapStateToProps)(NoteListView) as React.ComponentClass<IProps>;
