import React, { Fragment } from 'react';
import { Row, Col, Container, Button, Form, Table } from '@themesberg/react-bootstrap';
import { get } from 'lodash';
import SelectField from 'components/Common/SelectField';
import { useSharedForm, Controller } from 'utils/hooks/form';
import { FORMS } from 'config/enums';

const sites = [
  {
    site_nice: 'FanDuel',
    site_key: 'fanduel',
    acronym: 'FD'
  },
  {
    site_nice: 'BetMGM',
    site_key: 'betmgm',
    acronym: 'MGM'
  },
  {
    site_nice: 'DraftKings',
    site_key: 'draftkings',
    acronym: 'DK'
  },
  {
    site_nice: 'William Hill (US)',
    site_key: 'williamhill_us',
    acronym: 'WH'
  }
];

const Sport = ({ sports, activeEvents, getSportsAction, getSportEventsAction }) => {
  const { handleSubmit, control } = useSharedForm(FORMS.SPORTS_EVENTS, {
    mode: 'all'
  });
  React.useEffect(() => {
    getSportsAction();
  }, [getSportsAction]);

  const onSubmit = values => {
    getSportEventsAction(values.sports);
  };

  return (
    <>
      {activeEvents.list.length === 0 ? (
        <main>
          <section className='d-flex align-items-center my-5 mt-lg-6 mb-lg-5'>
            <Container>
              <p className='text-center'></p>
              <Row className='justify-content-center form-bg-image'>
                <Col xs={12} className='d-flex align-items-center justify-content-center'>
                  <div className='bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500'>
                    <div className='text-center text-md-center mb-4 mt-md-0'>
                      <h3 className='mb-0'>Select Sports</h3>
                    </div>
                    <Form onSubmit={handleSubmit(onSubmit)} className='mt-4 h-350' style={{ height: '350px' }}>
                      <Row>
                        <Col md={12} className='mb-3'>
                          <Controller
                            defaultValue={[]}
                            label='Sports'
                            as={SelectField}
                            name='sports'
                            control={control}
                            options={sports}
                            isMulti
                          />
                        </Col>
                      </Row>
                      <Button variant='primary' type='submit' className='w-100'>
                        Submit
                      </Button>
                    </Form>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </main>
      ) : (
        <div className='table-responsive'>
          <Table striped bordered hover className='entry_table'>
            <thead>
              <tr className='main-heading'>
                <th colSpan={1}>&nbsp;</th>
                <th colSpan={4}>Total</th>
                <th colSpan={4}>Spread</th>
              </tr>
            </thead>
            <tbody>
              <tr className='heading_name'>
                <td>Teams</td>
                <td>FD</td>
                <td>MGM</td>
                <td>DK</td>
                <td>WH</td>
                <td>FD</td>
                <td>MGM</td>
                <td>DK</td>
                <td>WH</td>
              </tr>
              {activeEvents.list.map((event, eventKey) => (
                <Fragment key={eventKey}>
                  {event &&
                    event._teams &&
                    Object.values(event._teams).map((team: any, teamKey) => (
                      <tr className='entry_start' key={teamKey}>
                        <td className='name_design'>{team.team_name}</td>
                        {sites.map((site: any, siteKey) => (
                          <td className={team?.totals?.[site.site_key]?.point ? 'number' : 'empty'} key={siteKey}>
                            {' '}
                            <span>{get(team, `totals.${site.site_key}.point`, '-')}</span>
                          </td>
                        ))}
                        {sites.map((site: any, siteKey) => (
                          <td className={team?.spreads?.[site.site_key]?.point ? 'number' : 'empty'} key={siteKey}>
                            {' '}
                            <span>{get(team, `spreads.${site.site_key}.point`, '-')}</span>
                          </td>
                        ))}
                      </tr>
                    ))}
                </Fragment>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </>
  );
};

export default Sport;
