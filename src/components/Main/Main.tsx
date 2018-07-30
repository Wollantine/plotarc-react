import * as React from 'react';
import { connect } from 'react-redux';
import { SearchForm } from '../SearchForm/SearchForm';
import { NoteList } from '../NoteList/NoteList';

const MainContainer = () => (
    <>
        <SearchForm/>
        <NoteList/>
    </>
);

const mapStateToProps = (state) => ({

})

export const Main = connect(mapStateToProps)(MainContainer);
