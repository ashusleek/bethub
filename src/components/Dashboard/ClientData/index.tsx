import React, { useEffect, useState } from 'react';
import { get } from 'lodash';
import { Row, Col } from '@themesberg/react-bootstrap';

import { FilesTableContainer, SuggestionTableContainer } from 'pages/Dashboard/containers/company';
import SelectField from 'components/Common/SelectField';

const ClientData = ({ getCompaniesAction, companies, user }) => {
  const [selectedCompany, selectCompany] = useState('');

  useEffect(() => {
    getCompaniesAction();
    selectCompany(get(user, 'company._id', null));
  }, [getCompaniesAction, user]);

  return (
    <>
      <Row className='justify-content-md-center py-4'>
        {user?.role !== 'user' && (
          <Col md={12} style={{ marginBottom: '15px' }}>
            {/* <SelectField
              options={companies}
              opValue='_id'
              opLabel='name'
              label='Company'
              name='company'
              onChange={e => selectCompany(e)}
              value={selectedCompany}
            /> */}
          </Col>
        )}

        <Col md={12}>
          <FilesTableContainer company={selectedCompany} user={user} />
        </Col>

        <Col md={12} className='py-3'>
          <SuggestionTableContainer company={selectedCompany} user={user} />
        </Col>
      </Row>
    </>
  );
};

export default ClientData;
