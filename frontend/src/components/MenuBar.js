import React, { Component } from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import ChangePasswordModal from './ChangePasswordModal';

class MenuBar extends Component {
     constructor(props) {
          super(props);

          this.state = {
               isOpen: false
          }
     }

     openModal = () => this.setState({ isOpen: true });
     closeModal = () => this.setState({ isOpen: false });

     render() {

          const profileIcon = (<><i className='fas fa-user-alt'></i> Profile</>);

          return (
               <>
                    <Navbar collapseOnSelect expand='md' variant='dark' sticky='top'>
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
                                             <NavDropdown.Item><h4>{this.props.userDetails.name}</h4></NavDropdown.Item>
                                             <NavDropdown.Divider />
                                             <NavDropdown.Item>
                                                  <div><i className="far fa-envelope"></i> Email:</div>
                                                  <div>{this.props.userDetails.email}</div>
                                             </NavDropdown.Item>
                                             <NavDropdown.Divider />
                                             <NavDropdown.Item>
                                                  <div><i className='fas fa-mobile-alt'></i> Mobile no:</div>
                                                  <div>{this.props.userDetails.mobile}</div>
                                             </NavDropdown.Item>
                                             <NavDropdown.Divider />
                                             <NavDropdown.Item onClick={() => this.openModal()}>Change Password</NavDropdown.Item>
                                        </NavDropdown>
                                   </Nav>
                              </Navbar.Collapse>
                         </Container>
                    </Navbar>

                    <ChangePasswordModal
                         userId={this.props.userId}
                         show={this.state.isOpen}
                         closeModal={() => this.closeModal()}
                    />
               </>
          );
     }
}

export default MenuBar;