import React from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';

export default class EditAccountModal extends React.Component {
     state = {
          isOpen: this.props.show,
          userId: this.props.id,
          insti_id: null,
          ac_id: null,
          ac_type: null,
          ac_number: null,
          balance: null
     };

     openModal = (data) => this.setState({
          isOpen: true,
          insti_id: data.institution_id,
          ac_id: data.account_id,
          ac_type: data.account_type,
          ac_number: data.account_number,
          balance: data.balance
     });
     closeModal = () => this.setState({ isOpen: false });

     onSubmit = () => {
          this.closeModal();

          let url = 'http://localhost:7000/accounts/';

          fetch(url + this.state.userId, {
               method: 'PUT',
               headers: {
                    'Content-Type': 'application/json;charset=utf-8'
               },
               body: JSON.stringify({
                    insti_id: this.state.insti_id,
                    ac_id: this.state.ac_id,
                    ac_type: this.state.ac_type,
                    ac_number: this.state.ac_number,
                    balance: this.state.balance
               })
          })
          .then(() => this.props.reload());
     }

     render() {
          return (
               <Modal
                    show={this.state.isOpen}
                    onHide={this.closeModal}
                    centered
               >
                    <Modal.Header closeButton>
                         <Modal.Title>Edit Account</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                         <Form>

                              <Form.Group as={Row} controlId="institution">
                                   <Form.Label column sm="4">Institution</Form.Label>
                                   <Col>
                                        <Form.Control as="select"
                                             onChange={e => this.setState({ insti_id: e.target.value })}
                                             value={this.state.insti_id}
                                        >
                                             <option>Choose...</option>
                                             <option value="1">DBS</option>
                                             <option value="2">UOB</option>
                                             <option value="3">OCBC</option>
                                             <option value="4">Standard Chartered</option>
                                             <option value="5">Citi</option>
                                             <option value="6">HSBC</option>
                                             <option value="7">Bank of China</option>
                                             <option value="8">Maybank</option>
                                        </Form.Control>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="accType">
                                   <Form.Label column sm="4">Account Type</Form.Label>
                                   <Col>
                                        <Form.Control as="select"
                                             onChange={e => this.setState({ ac_type: e.target.value })}
                                             value={this.state.ac_type}
                                        >
                                             <option>Choose...</option>
                                             <option value="savings">Savings</option>
                                             <option value="current">Current</option>
                                             <option value="fixed_deposit">Fixed Deposit</option>
                                             <option value="investment">Investment</option>
                                        </Form.Control>
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="accNumber">
                                   <Form.Label column sm="4">Account Number</Form.Label>
                                   <Col>
                                        <Form.Control type="text"
                                             value={this.state.ac_number}
                                             onChange={e => this.setState({ ac_number: e.target.value })}
                                        />
                                   </Col>
                              </Form.Group>

                              <Form.Group as={Row} controlId="balance">
                                   <Form.Label column sm="4">Balance</Form.Label>
                                   <Col>
                                        <Form.Control type="text"
                                             value={this.state.balance}
                                             onChange={e => this.setState({ balance: e.target.value })}
                                        />
                                   </Col>
                              </Form.Group>
                         </Form>
                    </Modal.Body>
                    <Modal.Footer>
                         <Button variant="primary" onClick={this.onSubmit}>
                              Save
                        </Button>

                         <Button variant="secondary" onClick={this.closeModal}>
                              Close
                        </Button>

                    </Modal.Footer>
               </Modal>
          );
     }
}