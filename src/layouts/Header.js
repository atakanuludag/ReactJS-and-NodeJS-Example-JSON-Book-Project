import React from 'react';
import {Container, Row, Col, Navbar, NavbarBrand, Nav, NavLink, NavItem} from 'reactstrap';



const Header = () => (
  <header>
    <Navbar fixed="top" color="light" light expand="xs" className="border-bottom border-gray bg-white" style={{ height: 80 }}>
      <Container>
        <Row noGutters className="position-relative w-100 align-items-center">

          <NavbarBrand href="/">
            <img src="../public/logo.png" alt="Nuevo Kitap Projesi" width="100" />
          </NavbarBrand>

          <Col className="d-none d-lg-flex justify-content-end">

            <Nav className="mrx-auto" navbar>

              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/">Kitap Listesi</NavLink>
              </NavItem>

              <NavItem className="d-flex align-items-center">
                <NavLink className="font-weight-bold" href="/create">Kitap Ekle</NavLink>
              </NavItem>

            </Nav>
          </Col>



        </Row>
      </Container>
    </Navbar>
  </header>
);

export default Header;
