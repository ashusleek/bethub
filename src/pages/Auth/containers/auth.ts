import Auth from 'components/Auth';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { loginAction } from 'state/actions/auth';

/* --------------------------- AUTH (Index) --------------------------- */

const authProps = (state: any) => ({});

function authDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      loginAction: loginAction.STARTED
    },
    dispatch
  );
}
export const AuthContainer = connect(authProps, authDispatch)(Auth);
