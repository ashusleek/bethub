import React, { useEffect, useMemo, useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Row } from '@themesberg/react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import PaginatedTable from 'components/Common/Table/PaginatedTable';
import ActionMenu from 'components/Common/Table/ActionMenu';
import InputField from 'components/Common/InputField';
import { UserAddEditContainer } from 'pages/Dashboard/containers/user';

const UserTable = ({ getUsersAction, deleteUserAction, user, showUserModal, setReduxKey }) => {
  const [selectedItem, selectItem] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsersAction({ limit: 5, sortKey: 'createdAt', sortValue: -1, page: 1 });
  }, [getUsersAction]);

  const handleDelete = row => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        { label: 'Yes', onClick: () => deleteUserAction(row._id) },
        { label: 'No', onClick: () => {} }
      ]
    });
  };

  const handleEdit = row => {
    selectItem(row);
    setReduxKey('showUserModal', true);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const columns = useMemo(() => {
    return [
      {
        name: 'Name',
        selector: 'firstName',
        cell: row => (
          <div>
            {row.firstName} {row.lastName}
          </div>
        ),
        sortable: true
      },
      { name: 'Email', selector: 'email', sortable: true },
      {
        name: 'Action',
        button: true,
        cell: row => <ActionMenu row={row} handleEdit={handleEdit} handleDelete={handleDelete} />
      }
    ];
    // eslint-disable-next-line
  }, []);

  const Header = memo(() => (
    <>
      <Row>
        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center'>
          <h5>Users</h5>
          <div className='d-flex align-items-center'>
            <InputField autoFocus icon={faSearch} type='text' value={search} placeholder='Search' onChange={handleSearch} />
          </div>
          <Button variant='primary' size='sm' className='m-1' onClick={() => handleEdit(null)}>
            <FontAwesomeIcon icon={faPlus} className='me-2' />
            New User
          </Button>
        </div>
      </Row>
    </>
  ));
  return (
    <>
      <PaginatedTable columns={columns} getListAction={getUsersAction} Header={Header} resource={user} search={search} />

      {showUserModal && (
        <UserAddEditContainer
          addModel={showUserModal}
          hideModel={() => setReduxKey('showUserModal', false)}
          user={selectedItem}
          mode='Edit'
        />
      )}
    </>
  );
};

export default UserTable;
