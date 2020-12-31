import React from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

export default class AddAccountModal extends React.Component {
     state = {
          isOpen: false,
          userId: this.props.id,
          insti_id: '0',
          ac_type: '0',
          ac_number: null,
          balance: null,
          instiIdError: '',
          accTypeError: '',
          accNumberError: '',
          balanceError: ''
     };

     openModal = () => this.setState({ isOpen: true });
     closeModal = () => this.setState({ isOpen: false });

     onSubmit = () => {
          if (this.handleValidation() === 0) {

               this.closeModal();

               let url = 'http://localhost:7000/accounts/';

               fetch(url + this.state.userId, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                         insti_id: this.state.insti_id,
                         ac_type: this.state.ac_type,
                         ac_number: this.state.ac_number,
                         balance: this.state.balance
                    })
               })
                    .then(() => this.props.reload());

               this.reset();
          }
     }

     reset() { // reset all state values
          this.setState({
               insti_id: '0',
               ac_type: '0',
               ac_number: null,
               balance: null
          });
     }

     handleValidation() {
          // reset all error messages
          this.setState({
               instiIdError: '',
               accTypeError: '',
               accNumberError: '',
               balanceError: ''
          })
          let error = 0;

          // check institution id
          if (this.state.insti_id === '0') {
               error++
               this.setState({ instiIdError: 'Please select one option' })
          }

          // check account type
          if (this.state.ac_type === '0') {
               error++
               this.setState({ accTypeError: 'Please select one option' })
          }

          // check account numbers
          if (!(/^\d+$/).test(this.state.ac_number)) {
               error++;
               this.setState({ accNumberError: 'Account Number must contain numbers(0-9) only' });
          }

          // check balance
          if (!(/^\d+\.?\d*$/).test(this.state.balance)) { 
               error++;
               this.setState({ balanceError: 'Balance must contain numbers(0-9) only' })
          }

          return error;

     }

     render() {
          return (
               <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                    centered
               >
                    <Modal.Header closeButton>
                         <Modal.Title>Add Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>

                              <Form.Group as={Row} controlId="institution">
                                   <Form.Label column sm="4">Institution</Form.Label>
                                   <Col>
                                        <Form.Control as="select"
                                             onChange={e => this.setState({ insti_id: e.target.value })}
                                        >
                                             <option value="0">Choose...</option>
                                             {this.props.insti.map((i) => {
                                                  return(<option key={i.institution_id} value={i.institution_id}>{i.full_name}</option>)
                                             })}
                                        </Form.Control>
                                        <span className='validation-error'>{this.state.instiIdError}</span>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="accType">
                                   <Form.Label column sm="4">Account Type</Form.Label>
                                   <Col>
                                        <Form.Control as="select"
                                             onChange={e => this.setState({ ac_type: e.target.value })}
                                        >
                                             <option value="0">Choose...</option>
                                             <option value="savings">Savings</option>
                                             <option value="current">Current</option>
                                             <option value="fixed_deposit">Fixed Deposit</option>
                                             <option value="investment">Investment</option>
                                        </Form.Control>
                                        <span className='validation-error'>{this.state.accTypeError}</span>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="accNumber">
                                   <Form.Label column sm="4">Account Number</Form.Label>
                                   <Col>
                                        <Form.Control type="text"
                                             value={this.state.ac_number}
                                             onChange={e => this.setState({ ac_number: e.target.value })}
                                        />
                                        <span className='validation-error'>{this.state.accNumberError}</span>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="balance">
                                   <Form.Label column sm="4">Balance</Form.Label>
                                   <Col>
                                        <Form.Control type="text"
                                             value={this.state.balance}
                                             onChange={e => this.setState({ balance: e.target.value })}
                                        />
                                        <span className='validation-error'>{this.state.balanceError}</span>
                                   </Col>
                              </Form.Group>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="primary" onClick={this.onSubmit}>
                              Add Account
                        </Button>

                         <Button variant="secondary" onClick={this.closeModal}>
                              Close
                        </Button>

                    </Modal.Footer>
               </Modal>
          );
     }
}