import * as React from 'react';
import { connect } from 'react-redux';
import { SearchForm } from '../SearchForm/SearchForm';
import { NoteList } from '../NoteList/NoteList';
import { createComponent } from 'react-fela';
import { Grid } from 'semantic-ui-react';


const CustomGrid = createComponent(() => ({
    display: 'grid',
    gridTemplateColumns: '1fr 4fr',
    gridColumnGap: '30px',
}))

const Box = createComponent(() => ({
    backgroundColor: 'white',
    // border: '2px solid #',
    boxShadow: 'rgb(204, 204, 204) 0px 1px 2px',
}))

const Sidebar = createComponent(() => ({
    padding: '50px 50px 0 50px',
}))

const Container = createComponent(() => ({
    marginTop: '50px',
    marginRight: '50px',
}))

const MainContainer = () => (
    <Grid stackable>
        <Grid.Column width={5}>
            <Sidebar><SearchForm/></Sidebar>
        </Grid.Column>
        <Grid.Column width={11}>
            <Container><NoteList/></Container>
        </Grid.Column>
    </Grid>
)

const mapStateToProps = (state) => ({

})

export const Main = connect(mapStateToProps)(MainContainer);
