import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faFootballBall } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Nav, Navbar, Dropdown, Container } from '@themesberg/react-bootstrap';
import { get } from 'lodash';

import { Routes } from 'routesLinks';
import history from 'utils/history';

const NavbarComponent = ({ user, logoutUser }) => {
  return (
    <Navbar variant='dark' expanded className='ps-0 pe-2 pb-0'>
      <Container fluid className='px-0'>
        <div className='d-flex justify-content-between w-100'>
          <div className='d-flex align-items-center'></div>

          <Nav className='align-items-center'>
            <Dropdown as={Nav.Item}>
              <Dropdown.Toggle as={Nav.Link} className='pt-1 px-0'>
                <div className='media d-flex align-items-center'>
                  <FontAwesomeIcon icon={faUserCircle} className='user-avatar md-avatar rounded-circle text-dark' />
                  <div className='media-body ms-2 text-dark align-items-center'>
                    <span className='mb-0 font-small fw-bold'>
                      {get(user, 'firstName', '')} {get(user, 'lastName', '')}
                    </span>
                  </div>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu className='user-dropdown dropdown-menu-right mt-2'>
                <Dropdown.Item className='fw-bold' onClick={() => history.push(Routes.Profile.path)}>
                  <FontAwesomeIcon icon={faUserCircle} className='me-2' /> My Profile
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item className='fw-bold' onClick={() => window.location.reload()}>
                  <FontAwesomeIcon icon={faFootballBall} className='me-2' /> Sports
                </Dropdown.Item>
                <Dropdown.Divider />

                <Dropdown.Item className='fw-bold' onClick={logoutUser}>
                  <FontAwesomeIcon icon={faSignOutAlt} className='text-danger me-2' /> Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
