import React, { useEffect, useState } from 'react';
import { Col, Row, Card, Button } from '@themesberg/react-bootstrap';
import { get } from 'lodash';

import OverviewChart from 'components/Dashboard/Overview/OverviewChart';
import { InfoCards } from 'components/Common/Widgets';
import SelectField from 'components/Common/SelectField';
import { FORMS } from 'config/enums';
import { useSharedForm, removeForm } from 'utils/hooks/form';

const Overview = ({ companies, overview, user, getCompanyOverviewAction, getCompaniesAction }) => {
  const [type, changeType] = useState('returnPerc');
  const [selectedCompany, selectCompany] = useState('');
  const [chartOverview, setOverview] = useState([]);
  const { setValues } = useSharedForm(FORMS.OVERVIEW, {
    mode: 'all'
  });

  useEffect(() => {
    getCompaniesAction();
  }, [getCompaniesAction]);

  useEffect(() => {
    setValues('company', companies[0]);
  }, [companies, setValues]);

  useEffect(() => {
    const company = get(user, 'company._id', selectedCompany);
    if (company) {
      getCompanyOverviewAction(company);
    }
  }, [user, selectedCompany, getCompanyOverviewAction]);

  useEffect(() => {
    const data = get(overview, 'graphParams', []).map(param => ({
      ...param,
      'return [%]': param.returnPerc,
      'return [EUR]': param.returnAbs
    }));
    setOverview(data);
  }, [overview, setOverview]);

  useEffect(() => {
    return () => removeForm(FORMS.ADD_USER);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Row className='justify-content-md-center py-4'>
        <Col xs={12} className='mb-4 d-none d-sm-block'>
          <Card className='bg-primary-alt shadow-sm'>
            <Card.Header className='d-flex flex-row align-items-center flex-0'>
              <div className='d-block'>
                <h5 className='fw-normal mb-2'>Overview</h5>
              </div>
              {user.role !== 'user' && (
                <div className='d-block ms-auto w-185'>
                  {/* <SelectField
                    opValue='_id'
                    opLabel='name'
                    label='Company'
                    name='company'
                    defaultValue=''
                    options={companies}
                    onChange={e => selectCompany(e)}
                    value={selectedCompany}
                  /> */}
                </div>
              )}
              <div className='d-flex ms-auto'>
                <Button
                  variant={type === 'returnPerc' ? 'primary' : 'primary-app'}
                  size='sm'
                  className='me-2'
                  onClick={() => changeType('returnPerc')}
                >
                  %
                </Button>
                <Button
                  variant={type === 'returnAbs' ? 'primary' : 'primary-app'}
                  size='sm'
                  className='me-3'
                  onClick={() => changeType('returnAbs')}
                >
                  abs
                </Button>
              </div>
            </Card.Header>
            <Card.Body className='p-2' style={{ height: '380px' }}>
              <OverviewChart data={chartOverview} xAxis='date' yAxis={type === 'returnPerc' ? 'return [%]' : 'return [EUR]'} />
            </Card.Body>
          </Card>
        </Col>

        <Row className='justify-content-md-center mt-4'>
          <Col xs={12} sm={6} xl={3} className='mb-4'>
            <InfoCards title='last dividend' value={`€ ${get(overview, 'tilesParams.lastDividend', 0)?.toFixed(2)}`} />
          </Col>

          <Col xs={12} sm={6} xl={3} className='mb-4'>
            <InfoCards title='running quarter PnL' value={`€ ${get(overview, 'tilesParams.runningQuarterProfits', 0)?.toFixed(2)}`} />
          </Col>

          <Col xs={12} sm={6} xl={3} className='mb-4'>
            <InfoCards title='total volume invested' value={`€ ${get(overview, 'tilesParams.totalVolume', 0)?.toFixed(2)}`} />
          </Col>

          <Col xs={12} sm={6} xl={3} className='mb-4'>
            <InfoCards title='current investment in 1up' value={`€ ${get(overview, 'tilesParams.currentInvestment', 0)?.toFixed(2)}`} />
          </Col>

          <Col xs={12} sm={6} xl={3} className='mb-4'>
            <InfoCards title='current commmitted' value={`€ ${get(overview, 'tilesParams.currentlyCommittedTile', 0)?.toFixed(2)}`} />
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default Overview;
