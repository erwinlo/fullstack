import React, { Component } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';

class ChangePasswordModal extends Component {
     constructor(props) {
          super(props);

          this.state = {
               oldPassword: null,
               newPassword: null,
               confirmNewPassword: null,
               oldPasswordError: null,
               newPasswordError: null,
               reply: null
          }
     }

     onSubmit = () => {
          if (this.handleValidation() === 0) {

               let url = 'http://localhost:7000/users/' + this.props.userId + '/password';

               fetch(url, {
                    method: 'PUT',
                    headers: {
                         'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                         oldPassword: this.state.oldPassword,
                         newPassword: this.state.newPassword
                    })
               })
                    .then(response => {
                         if (response.ok) {
                              this.reset();
                              this.props.closeModal()
                         } else {
                              this.setState({ reply: response.statusText })
                         }
                    })
          }
     }

     reset() { // reset all state values
          this.setState({
               oldPassword: null,
               newPassword: null,
               confirmNewPassword: null,
               oldPasswordError: null,
               newPasswordError: null,
               reply: null
          });
     }

     handleValidation() {
          // reset all error messages
          this.setState({
               oldPasswordError: null,
               newPasswordError: null,
          })
          let error = 0;

          if (this.state.oldPassword === null) {
               error++
               this.setState({ oldPasswordError: 'Password cannot be blank' })
          }

          if (this.state.newPassword === null || this.state.confirmNewPassword === null) {
               error++
               this.setState({ newPasswordError: 'Password cannot be blank' })
          }
          // check both new password are the same
          else if (this.state.newPassword !== this.state.confirmNewPassword) {
               error++
               this.setState({ newPasswordError: 'Password mismatch' })
          }

          // check new password is less than 6 characters.
          else if (this.state.newPassword.length < 6) {
               error++
               this.setState({ newPasswordError: 'Password should contain at least 6 characters' })
          }

          return error;

     }

     render() {
          return (
               <Modal show={this.props.show}
                    onHide={() => {
                         this.reset();
                         this.props.closeModal();
                    }}
               >
                    <Modal.Header closeButton>
                         <Modal.Title>Change Password</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <Form.Group as={Row} controlId="oldPassword">
                                   <Form.Label column sm="4">Old Password</Form.Label>
                                   <Col>
                                        <Form.Control type="password"
                                             placeholder="old password"
                                             onChange={e => this.setState({ oldPassword: e.target.value })}
                                             required
                                        />
                                        <span className='validation-error'>{this.state.oldPasswordError}</span>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="newPassword">
                                   <Form.Label column sm="4">New Password</Form.Label>
                                   <Col>
                                        <Form.Control type="password"
                                             placeholder="new password"
                                             onChange={e => this.setState({ newPassword: e.target.value })}
                                             required
                                        />
                                        <span className='validation-error'>{this.state.newPasswordError}</span>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="confirmPassword">
                                   <Form.Label column sm="4">New password</Form.Label>
                                   <Col>
                                        <Form.Control type="password"
                                             placeholder='confirm new password'
                                             onChange={e => this.setState({ confirmNewPassword: e.target.value })}
                                             required
                                        />
                                        <span className='validation-error'>{this.state.newPasswordError}</span>
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
                                             this.props.closeModal()
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

export default ChangePasswordModal;