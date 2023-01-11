import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Header = () => {
  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant='dark' expand="lg">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>E-Comm</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to='/cart'>
                <Nav.Link> <i className="fa-solid  fa-cart-shopping"></i> Cart</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/signUp">
                <Nav.Link> <i className="fa-solid fa-user"></i> Sign In</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
