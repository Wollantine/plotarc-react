import * as React from 'react';
import { createComponent } from 'react-fela';
import { Header, Grid, Icon } from 'semantic-ui-react';

export interface IReduxProps {
    message: string;
}

const NotFoundSplash = createComponent(() => ({
    marginTop: '100px !important',
}), (props: any) => <Header icon {...props}/>)

export const EmptyListView: React.StatelessComponent<IReduxProps> = ({message}) => (
    <Grid centered columns={1}>
        <NotFoundSplash icon>
            <Icon name="search"/>
            {message}
        </NotFoundSplash>
    </Grid>
)
