import React, { Component } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';

class ChangeEmailModal extends Component {
     constructor(props) {
          super(props);

          this.state = {
               email: this.props.email,               
               emailError: null,
               reply: null
          }
     }

     onSubmit = () => {
          if (this.handleValidation() === 0) {

               let url = 'http://localhost:7000/email/' + this.props.userId;

               fetch(url, {
                    method: 'PUT',
                    headers: {
                         'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                         email: this.state.email
                    })
               })
                    .then(response => {
                         if (response.ok) {
                              this.reset();
                              this.props.close();
                              this.props.loadUser();
                         } else {
                              response.json().then(data => { this.setState({ reply: data.message }) })
                         }
                    })
          }
     }

     reset() { // reset all state values
          this.setState({
               email: this.props.email,               
               emailError: null,
               reply: null
          });
     }

     handleValidation() {
          // reset all error messages
          this.setState({
               emailError: null,
          })
          let error = 0;

          const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          
          if (this.state.email === null) {
               error++
               this.setState({ emailError: 'Email cannot be blank' })
          }
          else if (!(regex.test(String(this.state.email).toLowerCase()))) {
               error++
               this.setState({ emailError: 'Invalid email format' })
          }

          return error;

     }

     render() {
          return (
               <Modal show={this.props.show}
                    onHide={() => {
                         this.reset();
                         this.props.close();
                    }}
               >
                    <Modal.Header closeButton>
                         <Modal.Title>Update Email</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <Form.Group as={Row} controlId="email">
                                   <Form.Label column sm="4">E-mail</Form.Label>
                                   <Col>
                                        <Form.Control type="email"
                                             placeholder={this.state.email}
                                             onChange={e => this.setState({ email: e.target.value })}
                                             required
                                        />
                                        <span className='validation-error'>{this.state.emailError}</span>
                                   </Col>
                              </Form.Group>
                              <span className='validation-error'>{this.state.reply}</span>
                              <Modal.Footer>
                                   <Button variant="primary" onClick={() => this.onSubmit()}>
                                        Update
                              </Button>

                                   <Button variant="secondary"
                                        onClick={() => {
                                             this.reset();
                                             this.props.close()
                                        }}
                                   >
                                        Cancel
                              </Button>
                              </Modal.Footer>
                         </Form>
                    </Modal.Body>
               </Modal>
          )
     }
}

export default ChangeEmailModal;