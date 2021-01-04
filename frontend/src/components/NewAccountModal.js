import React, { Component } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

class NewAccount extends Component {
     constructor(props) {
          super(props);

          this.state = {
               name: '',
               email: '',
               mobile: '',
               password: '',
               nameError: '',
               emailError: '',
               mobileError: '',
               passwordError: '',
               serverMsg: ''
          }
     }

     reset() {
          this.setState({
               name: '',
               email: '',
               mobile: '',
               password: '',
               nameError: '',
               emailError: '',
               mobileError: '',
               passwordError: '',
               serverMsg: ''
          });
     }

     doValidation() {
          this.setState({
               nameError: '',
               emailError: '',
               mobileError: '',
               passwordError: '',
               serverMsg: ''
          })

          const { isBlank, invalidEmail, validPassword } = require('../validation');

          let error = 0;

          if (isBlank(this.state.name)) {
               error++;
               this.setState({ nameError: 'Please enter your full name' });
          }
          if (isBlank(this.state.email)) {
               error++;
               this.setState({ emailError: 'Please enter your email address' });
          } else if (invalidEmail(this.state.email)) {
               error++;
               this.setState({ emailError: 'Invalid Email format' });
          }
          if (isBlank(this.state.mobile)) {
               error++;
               this.setState({ mobileError: 'Please enter your mobile number' });
          } else if (this.state.mobile.length !== 8) {
               error++;
               this.setState({ mobileError: 'Mobile number should be 8 digits' });
          }
          if (isBlank(this.state.password)) {
               error++;
               this.setState({ passwordError: 'Please enter your password' });
          } else if (!validPassword(this.state.password)) {
               error++;
               this.setState({ passwordError: 'Password should be 6-20 chars without spaces' });
          }

          console.log('errors:', error)

          if (error > 0)
               return false;
          else
               return true;
     }

     onSubmit = () => {
          if (this.doValidation()) {

               let url = 'http://localhost:7000/users/';

               fetch(url, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                         name: this.state.name,
                         email: this.state.email,
                         mobile: this.state.mobile,
                         password: this.state.password
                    })
               }).then(response => {
                    if (response.ok) {
                         this.reset();
                         this.props.close()
                    } else {
                         response.json().then(data => this.setState({ serverMsg: data.message }));
                    }
               });
          }
     }

     render() {
          return (
               <Modal
                    show={this.props.show}
                    onHide={() => {
                         this.reset();
                         this.props.close();
                    }}
                    centered
               >
                    <Modal.Header closeButton>
                         <Modal.Title>
                              <h2>Sign Up</h2>
                         </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <Form.Group as={Row} controlId="fullname">
                                   <Col>
                                        <Form.Control size='lg' placeholder='Full Name'
                                             onChange={e => this.setState({ name: e.target.value })}
                                        />
                                        <span className='validation-error'>{this.state.nameError}</span>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="email">
                                   <Col>
                                        <Form.Control size='lg' placeholder='Email address'
                                             onChange={e => this.setState({ email: e.target.value })}
                                        />
                                        <span className='validation-error'>{this.state.emailError}</span>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="mobile">
                                   <Col>
                                        <Form.Control size='lg' placeholder='Mobile Number'
                                             onChange={e => this.setState({ mobile: e.target.value })}
                                        />
                                        <span className='validation-error'>{this.state.mobileError}</span>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="password">
                                   <Col>
                                        <Form.Control type='password' size='lg' placeholder='New Password'
                                             onChange={e => this.setState({ password: e.target.value })}
                                        />
                                        <span className='validation-error'>{this.state.passwordError}</span>
                                   </Col>
                              </Form.Group>

                              <Row>
                                   <Col>
                                        <span className='validation-error'>{this.state.serverMsg}</span>
                                   </Col>
                              </Row>

                              <Row>
                                   <Col>
                                        <p className='text-muted small'>By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.</p>
                                   </Col>
                              </Row>

                              <Row className='d-flex justify-content-center'>
                                   <Button variant='success' size='lg'
                                        onClick={() => this.onSubmit()}>
                                        <h5>Sign Up</h5>
                                   </Button>
                              </Row>
                         </Form>
                    </Modal.Body >
               </Modal >
          );
     }
}

export default NewAccount;