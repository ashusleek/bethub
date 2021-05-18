import React from 'react';
import { makeData } from './Utils';

// Import React Table
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
// import 'react-table/react-table.css';

const columns = [
  {
    Header: 'Name',
    columns: [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        id: 'lastName',
        accessor: d => d.lastName
      }
    ]
  },
  {
    Header: 'Info',
    columns: [
      {
        Header: 'Age',
        accessor: 'age'
      },
      {
        Header: 'Status',
        accessor: 'status'
      }
    ]
  },
  {
    Header: 'Stats',
    columns: [
      {
        Header: 'Visits',
        accessor: 'visits'
      }
    ]
  }
];

const App = () => {
  return (
    <div>
      <ReactTable data={makeData()} columns={columns} defaultPageSize={10} className='-striped -highlight' />
      <br />
    </div>
  );
};

export default App;
