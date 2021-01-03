import React, { Component } from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';

class ChangeMobileModal extends Component {
     constructor(props) {
          super(props);

          this.state = {
               mobile: this.props.mobile,               
               mobileError: null,
               reply: null
          }
     }

     onSubmit = () => {
          if (this.handleValidation() === 0) {

               let url = 'http://localhost:7000/users/' + this.props.userId + '/mobile';

               fetch(url, {
                    method: 'PUT',
                    headers: {
                         'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                         mobile: this.state.mobile
                    })
               })
                    .then(response => {
                         if (response.ok) {
                              this.reset();
                              this.props.close();
                              this.props.loadUser();
                         } else {
                              this.setState({ reply: response.statusText })
                         }
                    })
          }
     }

     reset() { // reset all state values
          this.setState({
               mobile: this.props.mobile,               
               mobileError: null,
               reply: null
          });
     }

     handleValidation() {
          // reset all error messages
          this.setState({
               mobileError: null,
          })
          let error = 0;

          const regex = /^\d+$/;
          
          if (!(regex.test(this.state.mobile))) {
               error++
               this.setState({ mobileError: 'Mobile number can contain numbers only' })
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
                         <Modal.Title>Update Mobile Number</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>
                              <Form.Group as={Row} controlId="mobile">
                                   <Form.Label column sm="4">Mobile Number</Form.Label>
                                   <Col>
                                        <Form.Control type="mobile"
                                             placeholder={this.state.mobile}
                                             onChange={e => this.setState({ mobile: e.target.value })}
                                             required
                                        />
                                        <span className='validation-error'>{this.state.mobileError}</span>
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

export default ChangeMobileModal;