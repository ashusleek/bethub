import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faBuilding, faUsers, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { get } from 'lodash';

import { CounterWidget } from 'components/Common/Widgets';
import { NewsTableContainer } from 'pages/Dashboard/containers/news';
import { CompanyTableContainer } from 'pages/Dashboard/containers/company';
import { UserTableContainer } from 'pages/Dashboard/containers/user';
import { getOverviewStatsAction } from 'state/actions/app';

const Admin = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state: any) => state.app.common);

  useEffect(() => {
    dispatch(getOverviewStatsAction.STARTED());
  }, [dispatch]);

  return (
    <>
      <Row className='justify-content-md-center mt-4'>
        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget category='Companies' title={get(stats, 'companies', 0)} icon={faBuilding} iconColor='shape-secondary' />
        </Col>

        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget category='Users' title={get(stats, 'users', 0)} icon={faUsers} iconColor='shape-tertiary' />
        </Col>

        <Col xs={12} sm={6} xl={4} className='mb-4'>
          <CounterWidget category='Relative News' title={get(stats, 'news', 0)} icon={faNewspaper} iconColor='shape-tertiary' />
        </Col>
      </Row>

      <Row>
        <Col md={12} className='mb-2'>
          <CompanyTableContainer />
        </Col>

        <Col md={12} className='mb-2'>
          <UserTableContainer />
        </Col>

        <Col md={12} className='mb-2'>
          <NewsTableContainer />
        </Col>
      </Row>
    </>
  );
};

export default Admin;
