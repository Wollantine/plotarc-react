import { connect } from 'react-redux';
import { EmptyListView, IReduxProps } from './EmptyListView';
import { displayMessageNumberSelector } from './EmptyListState';
import { IState } from '../../../redux/appState';

const messagePool = [
    'Try another search.',
    'Nothing here.',
    'Nothing found.',
    'Zero notes found.',
    'No notes found.',
    'Nope.',
    'Rien de rien.',
    'No results.',
    'Miss.',
    'Niente.',
    'Empty list.',
    'Barren note list.',
    'Missing some notes relationships?',
    'Nothingness.',
    'Much empty. Very nothing. Wow.',
    'Emptyness.',
    'What was that noise?',
    'Void.',
];

const getMessageNumber = (num: number): string => (
    messagePool[num % messagePool.length]
)

const mapState = (state: IState): IReduxProps => ({
    message: getMessageNumber(displayMessageNumberSelector(state))
})

export const EmptyList = connect(mapState)(EmptyListView)
