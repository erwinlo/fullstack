import React, { Component } from 'react';
import { Modal, Form, Row, Col, Button } from 'react-bootstrap';

class NewAccount extends Component {

     onSubmit = () => {
          // if (this.handleValidation() === 0) {

          //      this.closeModal();

          //      let url = 'http://localhost:7000/users/';

          //      fetch(url + this.state.userId, {
          //           method: 'POST',
          //           headers: {
          //                'Content-Type': 'application/json;charset=utf-8'
          //           },
          //           body: JSON.stringify({
          //                insti_id: this.state.insti_id,
          //                ac_type: this.state.ac_type,
          //                ac_number: this.state.ac_number,
          //                balance: this.state.balance
          //           })
          //      })
          //           .then(() => this.props.reload());

          //      this.reset();
          // }
     }

     render() {
          return (
               <Modal
                    show={this.props.show}
                    onHide={() => this.props.close()}
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
                                        <Form.Control size='lg' placeholder='Full Name' />
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="email">
                                   <Col>
                                        <Form.Control size='lg' placeholder='Email address' />
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="mobile">
                                   <Col>
                                        <Form.Control size='lg' placeholder='Mobile Number' />
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="password">
                                   <Col>
                                        <Form.Control type='password' size='lg' placeholder='New Password' />
                                   </Col>
                              </Form.Group>

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