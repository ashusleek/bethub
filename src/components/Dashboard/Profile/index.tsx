import React from 'react';
import { Card, Row, Col, Button } from '@themesberg/react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faUserEdit, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { get } from 'lodash';

import { getDate } from 'utils/helper';
import { UserAddEditContainer } from 'pages/Dashboard/containers/user';
import { ChangePasswordContainer } from 'pages/Dashboard/containers/profile';

const User = ({ user, showUserModal, showPasswordModal, setReduxKey }) => {
  const [userMode, setUserMode] = React.useState<string>('');
  return (
    <>
      <Row className='justify-content-md-center py-4' style={{ padding: '10px' }}>
        <Card className='mb-3'>
          <Card.Header>
            <Row>
              <Col xl={4} md={6}>
                <h5>User Profile</h5>
              </Col>
              <Col xl={8} md={6} style={{ textAlign: 'right' }}>
                <Button
                  variant='primary'
                  size='sm'
                  className='m-1'
                  onClick={() => {
                    setUserMode('Add');
                    setReduxKey('showUserModal', true);
                  }}
                >
                  <FontAwesomeIcon icon={faUserPlus} className='me-2' />
                  New User
                </Button>
                <Button
                  variant='primary'
                  size='sm'
                  className='m-1'
                  onClick={() => {
                    setUserMode('Edit');
                    setReduxKey('showUserModal', true);
                  }}
                >
                  <FontAwesomeIcon icon={faUserEdit} className='me-2' />
                  Edit Profile
                </Button>
                <Button variant='primary' size='sm' className='m-1' onClick={() => setReduxKey('showPasswordModal', true)}>
                  <FontAwesomeIcon icon={faEdit} className='me-2' />
                  Change Password
                </Button>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col xl={6} style={{ marginBottom: '40px' }}>
                <h4>Name</h4>
                <Card.Text>
                  {get(user, 'firstName', '')} {get(user, 'lastName', '')}
                </Card.Text>
              </Col>
              <Col xl={6} style={{ marginBottom: '40px' }}>
                <h4>Email</h4>
                <Card.Text>{get(user, 'email', '')}</Card.Text>
              </Col>
              <Col xl={6} style={{ marginBottom: '40px' }}>
                <h4>Registered On</h4>
                <Card.Text>{getDate(user.createdAt)}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
      {showUserModal && (
        <UserAddEditContainer addModel={showUserModal} hideModel={() => setReduxKey('showUserModal', false)} user={user} mode={userMode} />
      )}
      {showPasswordModal && (
        <ChangePasswordContainer addModel={showPasswordModal} hideModel={() => setReduxKey('showPasswordModal', false)} user={user} />
      )}
    </>
  );
};

export default User;
