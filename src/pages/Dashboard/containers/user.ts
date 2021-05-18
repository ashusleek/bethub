import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { bindActionCreators } from 'redux';
import { setReduxKey } from 'state/actions/app';
import { createUserAction, deleteUserAction, getUsersAction, updateUserAction } from 'state/actions/user';
import UserTable from 'components/Dashboard/Admin/UserTable';
import AddEditUser from 'components/Dashboard/Admin/Forms/AddEditUser';

/* -------------------------------------------------------------------------- */
/*                                Admin/UserTable                             */
/* -------------------------------------------------------------------------- */

/* --------------------------------- UserTable ------------------------------ */

const userTableProps = state => ({
  user: state.user,
  showUserModal: state.app.common.showUserModal
});

function userTableDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      getUsersAction: getUsersAction.STARTED,
      deleteUserAction: deleteUserAction.STARTED,
      setReduxKey
    },
    dispatch
  );
}
export const UserTableContainer = connect(userTableProps, userTableDispatch)(UserTable);

/* ------------------------------ UserAddEdit ------------------------------ */

function userAddEditDispatch(dispatch: Dispatch) {
  return bindActionCreators(
    {
      createUserAction: createUserAction.STARTED,
      updateUserAction: updateUserAction.STARTED
    },
    dispatch
  );
}

export const UserAddEditContainer = connect(null, userAddEditDispatch)(AddEditUser);
