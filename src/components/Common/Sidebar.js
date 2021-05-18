import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faCog, faUsers, faNewspaper, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { Nav, Badge, Image, Button, Dropdown, Navbar } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from 'routesLinks';

const Sidebar = ({ user, logoutUser }) => {
  const location = useLocation();
  const { pathname } = location;
  const [show, setShow] = useState(false);
  const showClass = show ? 'show' : '';

  const onCollapse = () => setShow(!show);

  const NavItem = props => {
    const { title, link, external, target, icon, image, badgeText, badgeBg = 'secondary', badgeColor = 'primary' } = props;
    const classNames = badgeText ? 'd-flex justify-content-start align-items-center justify-content-between' : '';
    const navItemClassName = link === pathname ? 'active' : '';
    const linkProps = external ? { href: link } : { as: Link, to: link };

    return (
      <Nav.Item className={navItemClassName} onClick={() => setShow(false)}>
        <Nav.Link {...linkProps} target={target} className={classNames}>
          <span>
            {icon ? (
              <span className='sidebar-icon'>
                <FontAwesomeIcon icon={icon} />{' '}
              </span>
            ) : null}
            {image ? <Image src={image} width={20} height={20} className='sidebar-icon svg-icon' /> : null}

            <span className='sidebar-text'>{title}</span>
          </span>
          {badgeText ? (
            <Badge pill bg={badgeBg} text={badgeColor} className='badge-md notification-count ms-2'>
              {badgeText}
            </Badge>
          ) : null}
        </Nav.Link>
      </Nav.Item>
    );
  };

  return (
    <>
      <Navbar expand={false} collapseOnSelect variant='dark' className='navbar-theme-primary px-4 d-md-none'>
        <Navbar.Brand className='me-lg-5' as={Link} to={Routes.DashboardOverview.path}>
          <Image src='/1Up_Capital_logo_sm.png' className='navbar-brand-light' />
        </Navbar.Brand>
        <Navbar.Toggle as={Button} aria-controls='main-navbar' onClick={onCollapse}>
          <span className='navbar-toggler-icon' />
        </Navbar.Toggle>
      </Navbar>
      <CSSTransition timeout={300} in={show} classNames='sidebar-transition'>
        <SimpleBar className={`collapse ${showClass} sidebar d-md-block bg-primary text-white`}>
          <div className='sidebar-inner px-4 pt-3'>
            <div className='user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4'>
              <div className='d-flex align-items-center'>
                <div className='user-avatar lg-avatar me-4'>
                  <FontAwesomeIcon icon={faUserCircle} className='user-avatar md-avatar rounded-circle text-dark' />
                </div>
                <div className='d-block'>
                  <h6>
                    {' '}
                    {user.firstName} {user.lastName}
                  </h6>
                  <Button
                    as={Link}
                    variant='secondary'
                    size='xs'
                    to={Routes.Signin.path}
                    className='text-dark'
                    onClick={e => {
                      e.preventDefault();
                      logoutUser();
                    }}
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className='me-2' /> Logout
                  </Button>
                </div>
              </div>
              <Nav.Link className='collapse-close d-md-none' onClick={onCollapse}>
                <FontAwesomeIcon icon={faTimes} />
              </Nav.Link>
            </div>
            <Nav className='flex-column pt-3 pt-md-0'>
              <NavItem className='logo-img' link={Routes.Presentation.path} image='/1Up_Capital_logo.png' />

              {user.role !== 'user' && <NavItem title='Admin' link={Routes.DashboardAdmin.path} icon={faChartPie} />}
              <NavItem title='Overview' icon={faChartPie} link={Routes.DashboardOverview.path} />
              <NavItem title='Client Data' icon={faUsers} link={Routes.DashboardClientData.path} />
              <NavItem title='Relevant News' icon={faNewspaper} link={Routes.DashboardReleventNews.path} />

              <Dropdown.Divider className='my-3 border-indigo' />

              <NavItem title='Profile' icon={faCog} link={Routes.Profile.path} />
            </Nav>
          </div>
        </SimpleBar>
      </CSSTransition>
    </>
  );
};

export default Sidebar;
