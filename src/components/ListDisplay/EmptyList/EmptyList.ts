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
    'Niente.',
    'Empty list.',
    'Void.',
    'Barren note list.',
    'Missing some notes relationships?',
];

const getMessageNumber = (num: number): string => (
    messagePool[num % messagePool.length]
)

const mapState = (state: IState): IReduxProps => ({
    message: getMessageNumber(displayMessageNumberSelector(state))
})

export const EmptyList = connect(mapState)(EmptyListView)
