import React, { useEffect, useMemo, useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Row } from '@themesberg/react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { CompanyAddEditContainer } from 'pages/Dashboard/containers/company';
import PaginatedTable from 'components/Common/Table/PaginatedTable';
import ActionMenu from 'components/Common/Table/ActionMenu';
import InputField from 'components/Common/InputField';
import { getDate } from 'utils/helper';

const CompanyTable = ({ getCompaniesAction, deleteCompanyAction, company, showCompanyModal, setReduxKey }) => {
  const [selectedItem, selectItem] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCompaniesAction({ limit: 5, sortKey: 'createdAt', sortValue: -1, page: 1 });
  }, [getCompaniesAction]);

  const handleDelete = row => {
    debugger;
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        { label: 'Yes', onClick: () => deleteCompanyAction(row._id) },
        { label: 'No', onClick: () => {} }
      ]
    });
  };

  const handleEdit = row => {
    selectItem(row);
    setReduxKey('showCompanyModal', true);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const columns = useMemo(() => {
    return [
      { name: 'Company ID', selector: 'companyId', sortable: true },
      { name: 'Name', selector: 'name', sortable: true },
      { name: 'Investment', selector: 'investment', sortable: true },
      {
        name: 'Registered on',
        selector: 'createdAt',
        sortable: true,
        cell: row => <>{getDate(row.createdAt)}</>
      },
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
          <h5>Companies</h5>
          <div className='d-flex align-items-center'>
            <InputField autoFocus icon={faSearch} type='text' value={search} placeholder='Search' onChange={handleSearch} />
          </div>
          <Button variant='primary' size='sm' className='m-1' onClick={() => handleEdit(null)}>
            <FontAwesomeIcon icon={faPlus} className='me-2' />
            New Company
          </Button>
        </div>
      </Row>
    </>
  ));
  return (
    <>
      <PaginatedTable columns={columns} getListAction={getCompaniesAction} Header={Header} resource={company} search={search} />

      {showCompanyModal && (
        <CompanyAddEditContainer
          addModel={showCompanyModal}
          hideModel={() => setReduxKey('showCompanyModal', false)}
          company={selectedItem}
        />
      )}
    </>
  );
};

export default CompanyTable;
