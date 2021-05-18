import React, { useMemo, useState, useEffect, memo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone';
import { confirmAlert } from 'react-confirm-alert';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Button, Row } from '@themesberg/react-bootstrap';
import InputField from 'components/Common/InputField';
import { getDate } from 'utils/helper';
import ActionMenu, { ACTIONS } from 'components/Common/Table/ActionMenu';
import PaginatedTable from 'components/Common/Table/PaginatedTable';

const FilesTable = ({
  getComapnyFilesAction,
  uploadCompanyFileAction,
  downloadCompanyFileAction,
  deleteCompanyFileAction,
  file,
  company,
  user
}) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (company) {
      getComapnyFilesAction(company, { limit: 5, sortKey: 'createdAt', sortValue: -1, page: 1 });
    }
  }, [getComapnyFilesAction, company]);

  const handleDelete = row => {
    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure to do this...',
      buttons: [
        { label: 'Yes', onClick: () => deleteCompanyFileAction(row.company, row.s3FileName) },
        { label: 'No', onClick: () => {} }
      ]
    });
  };

  const handleDownload = row => {
    downloadCompanyFileAction(row.company, row.s3FileName);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const disabledActions = useMemo(() => {
    return user.role === 'admin' ? [ACTIONS.REMOVE] : [];
    // eslint-disable-next-line
  }, []);

  const columns = useMemo(() => {
    return [
      { name: 'Name', selector: 'fileName', sortable: true },
      { name: 'Extension', selector: 'mimeType', sortable: true },
      {
        name: 'Created on',
        selector: 'createdAt',
        sortable: true,
        cell: row => <>{getDate(row.createdAt)}</>
      },
      {
        name: 'Action',
        button: true,
        cell: row => <ActionMenu row={row} handleDownload={handleDownload} handleDelete={handleDelete} disabledActions={disabledActions} />
      }
    ];
    // eslint-disable-next-line
  }, []);

  const Header = memo(() => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

    useEffect(() => {
      if (acceptedFiles.length > 0) {
        uploadCompanyFileAction(acceptedFiles, company);
      }
    }, [acceptedFiles]);

    return (
      <>
        <Row>
          <div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center'>
            <h5>Files</h5>
            <div className='d-flex align-items-center'>
              <InputField icon={faSearch} type='text' value={search} placeholder='Search' autoFocus onChange={handleSearch} />
            </div>
            {user.role === 'user' && (
              <div {...getRootProps({ className: 'dropzone' })} style={{ display: 'contents' }}>
                <input {...getInputProps()} />
                <Button variant='primary' size='sm' className='m-1'>
                  <FontAwesomeIcon icon={faPlus} className='me-2' />
                  Upload
                </Button>
              </div>
            )}
          </div>
        </Row>
      </>
    );
  });
  return (
    <>
      <PaginatedTable
        columns={columns}
        getListAction={company && (filters => getComapnyFilesAction(company, filters))}
        Header={<Header />}
        resource={file}
        search={search}
      />
    </>
  );
};

export default FilesTable;
