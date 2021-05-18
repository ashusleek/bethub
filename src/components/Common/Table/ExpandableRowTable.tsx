import React from 'react';
import DataTable from 'react-data-table-component';
import { Card } from '@themesberg/react-bootstrap';

// The row data is composed into your custom expandable component via the data prop
const ExpandableComponent = ({ data }) => (
  <Card className='shadow-sm'>
    <Card.Header>Description</Card.Header>

    <Card.Body>{data.expandedRowData}</Card.Body>
  </Card>
);

const ExpandableRowComponent = ({ title, selectableRows, data, columns }) => {
  return (
    <DataTable
      title={title}
      columns={columns}
      data={data}
      selectableRows={selectableRows}
      // selectableRowsComponent={Checkbox}
      selectableRowsComponentProps={{ inkDisabled: true }}
      // sortIcon={<FontIcon>arrow_downward</FontIcon>}
      // onSelectedRowsChange={handleChange}
      expandableRows
      expandableRowsComponent={<ExpandableComponent data={data} />}
    />
  );
};

ExpandableRowComponent.defaultProps = {
  selectableRows: false
};

export default ExpandableRowComponent;
