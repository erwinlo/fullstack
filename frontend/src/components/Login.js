import React, { Component } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import Header from './Header';
import NewAccount from './NewAccountModal';

class Login extends Component {
     constructor(props) {
          super(props);

          this.state = {
               isNewAccountOpen: false,
               email: '',
               password: '',
               errorMsg: ''
          }
     }

     closeNewAccountModal() {
          this.setState({ isNewAccountOpen: false });
     }

     handleLogin() {
          let url = 'http://localhost:7000/login';

          fetch(url, {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/json;charset=utf-8'
               },
               body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
               })
          }).then(response => {
               if (response.ok) {
                    response.json().then(data => this.props.login(data.user_id));
               } else {
                    response.json().then(data => { this.setState({ errorMsg: data.message }) })
               }
          })


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
                                                       <Col>
                                                            <Form.Control size='lg' placeholder='Email address'
                                                                 onChange={e => this.setState({ email: e.target.value })}
                                                            />
                                                       </Col>
                                                  </Form.Group>

                                                  <Form.Group as={Row} controlId="password">
                                                       <Col>
                                                            <Form.Control type='password' size='lg' placeholder='Password'
                                                                 onChange={e => this.setState({ password: e.target.value })}
                                                            />
                                                       </Col>
                                                  </Form.Group>

                                                  <Button block size='lg' onClick={() => this.handleLogin()}><h5>Log In</h5></Button>

                                             </Form>

                                             <Row className='mt-3'>
                                                  <Col>
                                                  <p className='text-center validation-error'>{this.state.errorMsg}</p>
                                                  <p className='text-center'><a href='#'>Forgotten password?</a></p>
                                                  </Col>
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