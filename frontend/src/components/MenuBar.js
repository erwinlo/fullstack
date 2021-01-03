import React, { Component } from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import ChangePasswordModal from './ChangePasswordModal';
import ChangeEmailModal from './ChangeEmailModal';
import ChangeMobileModal from './ChangeMobileModal';
import Profile from './Profile';

class MenuBar extends Component {
     constructor(props) {
          super(props);

          this.state = {
               isEmailModalOpen: false,
               isMobileModalOpen: false,
               isPasswordModalOpen: false
          }
     }

     openEmailModal = () => this.setState({ isEmailModalOpen: true });
     closeEmailModal = () => this.setState({ isEmailModalOpen: false });
     openMobileModal = () => this.setState({ isMobileModalOpen: true });
     closeMobileModal = () => this.setState({ isMobileModalOpen: false });
     openPasswordModal = () => this.setState({ isPasswordModalOpen: true });
     closePasswordModal = () => this.setState({ isPasswordModalOpen: false });

     render() {

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

                                   <Profile name={this.props.userDetails.name}
                                        email={this.props.userDetails.email}
                                        mobile={this.props.userDetails.mobile}
                                        openEmailModal={() => this.openEmailModal()}
                                        openMobileModal={() => this.openMobileModal()}
                                        openPasswordModal={() => this.openPasswordModal()}
                                   />

                              </Navbar.Collapse>
                         </Container>
                    </Navbar>

                    <ChangeEmailModal
                         userId={this.props.userId}
                         email={this.props.userDetails.email}
                         show={this.state.isEmailModalOpen}
                         close={() => this.closeEmailModal()}
                         loadUser={() => this.props.loadUser()}
                    />

                    <ChangeMobileModal
                         userId={this.props.userId}
                         mobile={this.props.userDetails.mobile}
                         show={this.state.isMobileModalOpen}
                         close={() => this.closeMobileModal()}
                         loadUser={() => this.props.loadUser()}
                    />

                    <ChangePasswordModal
                         userId={this.props.userId}
                         show={this.state.isPasswordModalOpen}
                         close={() => this.closePasswordModal()}
                    />
               </>
          );
     }
}

export default MenuBar;