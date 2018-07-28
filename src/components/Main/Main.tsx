import * as React from 'react';
import { connect } from 'react-redux';
import { SearchForm } from '../SearchForm/SearchForm';

const MainContainer = () => <SearchForm/>;

const mapStateToProps = (state) => ({

})

export const Main = connect(mapStateToProps)(MainContainer);
