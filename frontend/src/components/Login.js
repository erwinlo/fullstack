import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Header from './Header';
import NewAccount from './NewAccountModal';

class Login extends Component {
     constructor(props) {
          super(props);

          this.state = {
               isNewAccountOpen: false
          }
     }

     closeNewAccountModal() {
          this.setState({ isNewAccountOpen: false });
     }

     handleLogin() {
          // toggle();
     }

     render() {
          return (
               <>
                    <Header />

                    <NewAccount
                         show={this.state.isNewAccountOpen}
                         close={() => this.closeNewAccountModal()}
                    />

                    <Container>
                         <Row className="row-login">
                              <Col className="d-flex justify-content-center">
                                   <Card border='light' className='login-box'>
                                        <Card.Body>
                                             <Form>

                                                  <Form.Group as={Row} controlId="email">
                                                       {/* <Form.Label column sm="4">Email</Form.Label> */}
                                                       <Col>
                                                            <Form.Control size='lg' placeholder='Email address' />
                                                       </Col>
                                                  </Form.Group>

                                                  <Form.Group as={Row} controlId="password">
                                                       {/* <Form.Label column sm="4">Password</Form.Label> */}
                                                       <Col>
                                                            <Form.Control size='lg' placeholder='Password' />
                                                       </Col>
                                                  </Form.Group>

                                                  <Button block size='lg' onClick={() => this.handleLogin()}><h5>Log In</h5></Button>

                                             </Form>

                                             <Row className='mt-3 d-flex justify-content-center'>
                                                  <a href='#'>Forgotten password?</a>
                                             </Row>

                                             <hr />

                                             <Row className='d-flex justify-content-center'>
                                                  <Button variant='success' size='lg'
                                                       onClick={() => this.setState({ isNewAccountOpen: true })}>
                                                       <h5>Create New Account</h5>
                                                  </Button>
                                             </Row>
                                        </Card.Body>
                                   </Card>
                              </Col>
                         </Row>
                    </Container>
               </>
          )
     }
}

export default Login;