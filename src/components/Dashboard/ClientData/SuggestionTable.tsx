import React, { useEffect, useMemo, useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Row } from '@themesberg/react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import PaginatedTable from 'components/Common/Table/PaginatedTable';
import ActionMenu, { ACTIONS } from 'components/Common/Table/ActionMenu';
import InputField from 'components/Common/InputField';
import { getDate } from 'utils/helper';
import { SuggestionAddEditContainer } from 'pages/Dashboard/containers/company';

const SuggestionTable = ({
  getCompanySuggestionsAction,
  deleteCompanySuggestionAction,
  suggestion,
  showSuggestionModal,
  setReduxKey,
  company,
  user
}) => {
  const [selectedItem, selectItem] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (company) {
      getCompanySuggestionsAction(company, { limit: 5, sortKey: 'createdAt', sortValue: -1, page: 1 });
    }
  }, [getCompanySuggestionsAction, company]);

  const handleDelete = row => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        { label: 'Yes', onClick: () => deleteCompanySuggestionAction(row.company, row._id) },
        { label: 'No', onClick: () => {} }
      ]
    });
  };

  const handleEdit = row => {
    selectItem(row);
    setReduxKey('showSuggestionModal', true);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const disabledActions = useMemo(() => {
    return user.role === 'super admin' ? [ACTIONS.EDIT] : [];
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(() => {
    const actions: any = [
      { name: 'Title', selector: 'title', sortable: true },
      { name: 'Description', selector: 'description', sortable: true },
      {
        name: 'Created on',
        selector: 'createdAt',
        sortable: true,
        cell: row => <>{getDate(row.createdAt)}</>
      }
    ];
    if (user.role !== 'admin') {
      actions.push({
        name: 'Action',
        button: true,
        cell: row => <ActionMenu row={row} handleEdit={handleEdit} handleDelete={handleDelete} disabledActions={disabledActions} />
      });
    }
    return actions;
    // eslint-disable-next-line
  }, [user]);

  const Header = memo(() => (
    <>
      <Row>
        <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center'>
          <h5>Suggestions</h5>
          <div className='d-flex align-items-center'>
            <InputField autoFocus icon={faSearch} type='text' value={search} placeholder='Search' onChange={handleSearch} />
          </div>
          {user.role === 'user' && (
            <Button variant='primary' size='sm' className='m-1' onClick={() => handleEdit(null)}>
              <FontAwesomeIcon icon={faPlus} className='me-2' />
              New Suggestion
            </Button>
          )}
        </div>
      </Row>
    </>
  ));
  return (
    <>
      <PaginatedTable
        columns={columns}
        getListAction={company && (filters => getCompanySuggestionsAction(company, filters))}
        Header={Header}
        resource={suggestion}
        search={search}
      />

      {showSuggestionModal && (
        <SuggestionAddEditContainer
          addModel={showSuggestionModal}
          hideModel={() => setReduxKey('showSuggestionModal', false)}
          suggestion={selectedItem}
        />
      )}
    </>
  );
};

export default SuggestionTable;
