import React, { useEffect, useMemo, useState, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus } from '@fortawesome/free-solid-svg-icons';
import { Button, Row } from '@themesberg/react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { NewsAddEditContainer } from 'pages/Dashboard/containers/news';
import PaginatedTable from 'components/Common/Table/PaginatedTable';
import ActionMenu from 'components/Common/Table/ActionMenu';
import InputField from 'components/Common/InputField';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { getDate } from 'utils/helper';

const NewsTable = ({ getNewsAction, deleteNewsAction, news, showNewsModal, setReduxKey }) => {
  const [selectedItem, selectItem] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getNewsAction({ limit: 5, sortKey: 'createdAt', sortValue: -1, page: 1 });
  }, [getNewsAction]);

  const handleDelete = row => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this.',
      buttons: [
        { label: 'Yes', onClick: () => deleteNewsAction(row._id) },
        { label: 'No', onClick: () => {} }
      ]
    });
  };

  const handleEdit = row => {
    selectItem(row);
    setReduxKey('showNewsModal', true);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const columns = useMemo(() => {
    return [
      { name: '#', selector: '_id', sortable: true },
      { name: 'Title', selector: 'title', sortable: true },
      {
        name: 'Published on',
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
          <h5>Relevant News</h5>
          <div className='d-flex align-items-center'>
            <InputField autoFocus icon={faSearch} type='text' value={search} placeholder='Search' onChange={handleSearch} />
          </div>
          <Button variant='primary' size='sm' className='m-1' onClick={() => handleEdit(null)}>
            <FontAwesomeIcon icon={faPlus} className='me-2' />
            New News
          </Button>
        </div>
      </Row>
    </>
  ));
  return (
    <>
      <PaginatedTable columns={columns} getListAction={getNewsAction} Header={Header} resource={news} search={search} />

      {showNewsModal && (
        <NewsAddEditContainer addModel={showNewsModal} hideModel={() => setReduxKey('showNewsModal', false)} news={selectedItem} />
      )}
    </>
  );
};

export default NewsTable;
