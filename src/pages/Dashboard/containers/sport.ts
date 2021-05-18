import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import { getSportsAction, getSportEventsAction } from 'state/actions/sport';
import { getKeyCredential } from 'state/selectors/sport';
import Sport from 'components/Dashboard/Sport';

const getSportsProps = state => ({
  sports: getKeyCredential(state),
  activeEvents: state.sport.activeEvents
});

function getSportsDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getSportsAction: getSportsAction.STARTED,
      getSportEventsAction: getSportEventsAction.STARTED
    },
    dispatch
  );
}
export const SportContainer = connect(getSportsProps, getSportsDispatch)(Sport);
