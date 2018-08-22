import { connect } from 'react-redux';
import { IState, notesSelector } from 'redux/appState';
import * as R from 'ramda';
import { selectedRelatedToSelector } from '../SearchFormState';
import { selectRelatedTo } from '../SearchFormActions';
import { RelatedToConditionView } from './RelatedToConditionView';

const mapState = (state: IState) => ({
    notes: R.values(notesSelector(state)),
    selectedRelatedTo: selectedRelatedToSelector(state),
})

const mapDispatch = (dispatch) => ({
    onRelatedToSelect: (note) => dispatch(selectRelatedTo(note)),
})

export const GroupByCondition = connect(mapState, mapDispatch)(RelatedToConditionView);
