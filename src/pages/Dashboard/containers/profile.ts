import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import { changePasswordAction } from 'state/actions/user';
import { setReduxKey } from 'state/actions/app';
import Profile from 'components/Dashboard/Profile';
import ChangePassword from 'components/Dashboard/Admin/Forms/ChangePassword';

/* -------------------------------------------------------------------------- */
/*                                 Profile/Index                                 */
/* -------------------------------------------------------------------------- */

const userProps = state => ({
  user: state.user.current,
  showUserModal: state.app.common.showUserModal,
  showPasswordModal: state.app.common.showPasswordModal
});

function profileDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setReduxKey
    },
    dispatch
  );
}

export const UserProfileContainer = connect(userProps, profileDispatch)(Profile);

/* ------------------------------ ChangePassword ------------------------------ */

function changePasswordDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      changePasswordAction: changePasswordAction.STARTED
    },
    dispatch
  );
}
export const ChangePasswordContainer = connect(null, changePasswordDispatch)(ChangePassword);
