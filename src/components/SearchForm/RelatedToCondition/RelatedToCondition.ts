import { connect } from 'react-redux';
import { IState, notesSelector } from 'redux/appState';
import * as R from 'ramda';
import { selectedRelatedToSelector } from '../SearchFormState';
import { selectRelatedTo } from '../SearchFormActions';
import { Selector } from '../Selector/Selector';

const mapState = (state: IState) => ({
    items: R.values(notesSelector(state)),
    selectedItem: selectedRelatedToSelector(state),
    placeholder: 'Select a note',
})

const mapDispatch = (dispatch) => ({
    onSelect: (note) => dispatch(selectRelatedTo(note)),
})

export const GroupByCondition = connect(mapState, mapDispatch)(Selector);
