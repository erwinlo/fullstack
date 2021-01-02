import React from 'react';
import { Container, Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';

const UserDetails = ({ data }) => {

     const profileIcon = (<><i className='fas fa-user-alt'></i> Profile</>);

     return (
          <Navbar collapseOnSelect expand='lg' bg='primary' variant='dark' sticky='top'>
               <Container>
                    <Navbar.Brand href='#home'>NUS Ledger</Navbar.Brand>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                    <Navbar.Collapse id='responsive-navbar-nav'>
                         <Nav className='mr-auto'>
                         <Nav.Link href="#banks">Banks</Nav.Link>
                         <Nav.Link href="#investments">Investments</Nav.Link>
                         <Nav.Link href="#cpf">CPF</Nav.Link>
                         <Nav.Link href="#transactions">Transactions</Nav.Link>
                         </Nav>
                         <Nav>
                              <NavDropdown title={profileIcon} id='collasible-nav-dropdown'>
                                   <NavDropdown.Item><h4>{data.name}</h4></NavDropdown.Item>
                                   <NavDropdown.Divider />
                                   <NavDropdown.Item><i className="far fa-envelope"></i> {data.email}</NavDropdown.Item>
                                   <NavDropdown.Item><i className='fas fa-mobile-alt'></i> {data.mobile}</NavDropdown.Item>
                                   <NavDropdown.Item><a href="#">Change Password</a></NavDropdown.Item>
                                   </NavDropdown>
                         </Nav>
                    </Navbar.Collapse>
               </Container>
          </Navbar>

     );
}

export default UserDetails;