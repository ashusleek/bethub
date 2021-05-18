import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { Card } from '@themesberg/react-bootstrap';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const PaginatedTable = ({ getListAction, resource, columns, Header, search }) => {
  const filters = { ...resource, searchValue: search || undefined };
  delete filters.list;

  const onChangePage = page => {
    getListAction({ ...filters, page: page });
  };

  const onChangeRowsPerPage = limit => {
    getListAction({ ...filters, limit: limit });
  };
  const onSort = (column, sortDirection) => {
    getListAction({ ...filters, sortKey: column.selector, sortValue: sortDirection === 'asc' ? 1 : -1 });
  };

  useEffect(() => {
    if (getListAction) {
      getListAction({ ...filters, searchValue: search || undefined });
    }
    // eslint-disable-next-line
  }, [search]);

  return (
    <Card border='light' className='shadow-sm'>
      <Card.Header>
        {Header.props && Header}
        {!Header.props && <Header />}
      </Card.Header>

      <div className='data-table'>
        <DataTable
          columns={columns}
          pagination
          data={resource.list}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          paginationServer={true}
          paginationTotalRows={resource.total}
          paginationPerPage={5}
          sortServer={true}
          onSort={onSort}
          paginationRowsPerPageOptions={[5, 10, 15, 20, 30]}
        />
      </div>
    </Card>
  );
};

export default PaginatedTable;
