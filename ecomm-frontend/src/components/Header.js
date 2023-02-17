import React from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userAction'

const Header = () => {
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Reclair</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/cart'>
                <Nav.Link> <i className="fa-solid  fa-cart-shopping"></i> Cart</Nav.Link>
              </LinkContainer>
              {userInfo?.name ? (
                <NavDropdown title={userInfo.name} id='userName'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : <LinkContainer to="/login">
                <Nav.Link> <i className="fa-solid fa-user"></i> Sign In</Nav.Link>
              </LinkContainer>}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
